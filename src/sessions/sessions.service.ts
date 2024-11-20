import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from '../database/entities/session.entity';
import { User } from '../database/entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { addDays, getDaysInMonth, getDaysInYear } from 'date-fns';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async create({
    userId,
    time,
    startDate,
    step,
    finishDate,
  }: {
    userId: string;
    time: number;
    startDate: Date;
    step: 'WORK' | 'SHORT' | 'LONG';
    finishDate: Date;
  }) {
    const session = new Session();
    session.userId = userId;
    session.time = time;
    session.startDate = startDate;
    session.step = step;
    session.finishDate = finishDate;

    return await this.sessionRepository.save(session);
  }

  async getHistory({ userId, page }) {
    const pageSize = 5;

    const history = await this.sessionRepository.findAndCount({
      where: { userId },
      order: { startDate: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      items: history[0],
      total: history[1],
    };
  }

  async getChartData({ userId, start, type }) {
    const daysInMonth = getDaysInMonth(start);
    const daysInYear = getDaysInYear(start);

    const finish =
      type === 'WEEK'
        ? addDays(start, 7)
        : type === 'MONTH'
        ? addDays(start, daysInMonth)
        : addDays(start, daysInYear);
    console.log(start, finish);

    const history = await this.sessionRepository.find({
      where: { userId, startDate: Between(start, finish) },
      order: { startDate: 'DESC' },
    });

    return history;
  }

  async getSummary({ userId }) {
    const summary = await this.sessionRepository
      .createQueryBuilder('session')
      .select('session.step', 'step')
      .addSelect('SUM(session.time)', 'totalTime')
      .where('session.userId = :userId', { userId })
      .groupBy('session.step')
      .getRawMany();

    const totalWorkIndex = summary?.findIndex(({ step }) => step === 'WORK');
    const totalShortIndex = summary?.findIndex(({ step }) => step === 'SHORT');
    const totalLongIndex = summary?.findIndex(({ step }) => step === 'LONG');

    return {
      totalWork:
        totalWorkIndex != -1
          ? (+summary[totalWorkIndex].totalTime / 60 / 60).toFixed(1)
          : 0,
      totalShort:
        totalShortIndex != -1
          ? (+summary[totalShortIndex].totalTime / 60 / 60).toFixed(1)
          : 0,
      totalLong:
        totalLongIndex != -1
          ? (+summary[totalLongIndex].totalTime / 60 / 60).toFixed(1)
          : 0,
    };
  }

  async getTopList({ page }) {
    const pageSize = 25;
    const totalUsersCount = await this.sessionRepository
      .createQueryBuilder('session')
      .select('COUNT(DISTINCT session.userId)', 'count')
      .where('session.step = :step', { step: 'WORK' })
      .andWhere('YEARWEEK(session.startDate, 1) = YEARWEEK(NOW(), 1)') // Current week
      .getRawOne(); // Returns a single result

    const topList = await this.sessionRepository
      .createQueryBuilder('session')
      .select('session.userId', 'id')
      .addSelect('user.name', 'name')
      .addSelect('user.picture', 'picture')
      .addSelect('SEC_TO_TIME(SUM(session.time * 60))', 'totalFocusedTime')
      .innerJoin(User, 'user', 'user.id = session.userId')
      .where('session.step = :step', { step: 'WORK' })
      .andWhere('YEARWEEK(session.startDate, 1) = YEARWEEK(NOW(), 1)') // Текущая неделя
      .groupBy('session.userId')
      .orderBy('totalFocusedTime', 'DESC')
      .limit(100)
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .getRawMany();

    return {
      items: topList,
      total: +totalUsersCount.count,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
