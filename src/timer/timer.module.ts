import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';
import { Timer } from '../database/entities/timer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timer])],
  controllers: [TimerController],
  providers: [TimerService],
  exports: [TimerService],
})
export class TimerModule {}
