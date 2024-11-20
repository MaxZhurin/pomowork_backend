// Timer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timer } from '../database/entities/timer.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Override, CrudRequestOptions } from '@nestjsx/crud';
import { Request } from 'express';
class QueryDTO {
  filter: object;
  range: number[];
  // sort: string[];
  limit: number;
  page: number;
  sort: string[];
  offset: number;
}

@Injectable()
export class TimerService {
  constructor(
    @InjectRepository(Timer)
    private readonly timerRepository: Repository<Timer>,
  ) {}

  async create(userId: string): Promise<Timer> {
    const timer = new Timer();
    timer.userId = userId;
    return await this.timerRepository.save(timer);
  }

  async getTimer(userId) {
    console.log('id', userId);
    let timer = await this.timerRepository.findOne({
      where: { userId },
    });
    // console.log(timer.startTime, timer.startTimeSec, (+timer.startTime + timer.startTimeSec * 1000) < Date.now(), !timer.pauseSec)

    // if ((+timer.startTime + timer.startTimeSec * 1000) < Date.now() && !timer.pauseSec) {
    //   timer = { ...timer, startTime: 0, isActive: false };
    //   await this.timerRepository
    //     .createQueryBuilder()
    //     .update('timer')
    //     .set({
    //       startTime: 0,
    //       isActive: false,
    //     })
    //     .where('userId = :userId', { userId })
    //     .execute();
    // }

    return {
      ...timer,
    };
  }

  async updateTimer(userId: string, data) {
    return await this.timerRepository
      .createQueryBuilder()
      .update('timer')
      .set({
        ...data
      })
      .where('userId = :userId', { userId })
      .execute();
  }
}
