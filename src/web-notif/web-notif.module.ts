import { Module } from '@nestjs/common';
import { WebNotifService } from './web-notif.service';
import { WebNotifController } from './web-notif.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Webpush } from '../database/entities/webpush.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Webpush])],
  controllers: [WebNotifController],
  providers: [WebNotifService],
  exports: [WebNotifService],
})
export class WebNotifModule {}
