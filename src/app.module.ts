import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TimerModule } from './timer/timer.module';

import { AuthGuard } from '@/src/auth/auth.guard';

import { CONNECTION } from '@/src/shared/db.connection';
import { SocketModule } from './socket/socket.module';
import { WebNotifModule } from './web-notif/web-notif.module';
import { SessionsModule } from './sessions/sessions.module';
import { SettingsModule } from './settings/settings.module';
@Module({
  imports: [
    //@ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    TimerModule,
    SocketModule,
    WebNotifModule,
    SessionsModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      //@ts-ignore
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
