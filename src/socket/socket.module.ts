import { WebNotifService } from '../web-notif/web-notif.service';
import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timer } from '../database/entities/timer.entity';
import { Session } from '../database/entities/session.entity';
import { Webpush } from '../database/entities/webpush.entity';
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../database/entities/settings.entity';
import { TimerService } from '../timer/timer.service';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [SessionsModule, TypeOrmModule.forFeature([Timer, Session, Webpush, Settings])],
  providers: [SocketGateway, SocketService, WebNotifService, SettingsService, TimerService],
})
export class SocketModule {}
