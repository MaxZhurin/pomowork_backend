import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWebNotifDto } from './dto/create-web-notif.dto';
import { UpdateWebNotifDto } from './dto/update-web-notif.dto';
import { Webpush } from '../database/entities/webpush.entity';
import { webpush } from '@/src/webpush';

@Injectable()
export class WebNotifService {
  constructor(
    @InjectRepository(Webpush)
    private readonly webpushRepository: Repository<Webpush>,
  ) {}

  async saveSubscription({
    userId,
    subscription,
  }: {
    userId: string;
    subscription: string;
  }) {
    const currentSubscription = await this.webpushRepository.findOne({
      where: { userId },
    });
    if (!currentSubscription) {
      const webpush = new Webpush();
      webpush.userId = userId;
      webpush.data = subscription;
      this.webpushRepository.save(webpush);
    }
  }

  async sendNotification({ userId, message }) {
    const subscription = await this.webpushRepository.findOne({
      where: { userId },
      // relations: ['workpoints', 'roles'],
    });
    if (subscription) {
      webpush.sendNotification(JSON.parse(subscription.data), message);

    }
    return `This action returns all webNotif`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webNotif`;
  }

  update(id: number, updateWebNotifDto: UpdateWebNotifDto) {
    return `This action updates a #${id} webNotif`;
  }

  remove(id: number) {
    return `This action removes a #${id} webNotif`;
  }
}
