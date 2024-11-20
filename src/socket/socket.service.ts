import { Injectable } from '@nestjs/common';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { Timer } from '../database/entities/timer.entity';
import { Session } from '../database/entities/session.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual } from 'typeorm';
import { format } from 'date-fns';

@Injectable()
export class SocketService {
  constructor(
    @InjectRepository(Timer)
    private readonly timerRepository: Repository<Timer>,

    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  create(createSocketDto: CreateSocketDto) {
    return 'This action adds a new socket';
  }

  findAll() {
    return `This action returns all socket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socket`;
  }

  update(id: number, updateSocketDto: UpdateSocketDto) {
    return `This action updates a #${id} socket`;
  }

  remove(id: number) {
    return `This action removes a #${id} socket`;
  }

  async saveTimer(userId, data) {
    const timer = await this.timerRepository.findOne({
      where: { userId },
    });

    if (timer.isActive !== data.isActive) {
      // if (data.isActive && !data.paused) {
      // }
    }

    // if (timer.step !== data.step) {
    const lastSession = await this.sessionRepository.find({
      where: {
        user: { id: userId },
        createdAt: MoreThanOrEqual(new Date(format(new Date(), 'yyyy-MM-dd'))),
      },
      order: { id: 'DESC' },
    });

    // lastSession.
    // console.log('lastSession', lastSession, lastSession.findIndex(({ step }) => step === data.step));
    // if (lastSession.findIndex(({ step }) => step === data.step) === -1) {
    //   let session = new Session();
    //   session.user = userId
    //   // .user = userId;
    //   session.step = data.step;
    //   session.time = 0;

    //   const ress = await this.sessionRepository.save(session);
    //   console.log('session', ress, session)
    // }
    // }

    // const timer = new Timer();
    const res = await this.timerRepository
      .createQueryBuilder()
      .update('timer')
      .set({
        ...data,
      })
      .where('userId = :userId', { userId })
      .execute();

    // const res = await this.timerRepository.save(timer);
    return res;
  }
}
