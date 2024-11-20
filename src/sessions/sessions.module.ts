import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { SettingsService } from './settings.service';
// import { SettingsController } from './settings.controller';
import { Settings } from '../database/entities/settings.entity';
import { Session } from '../database/entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
