import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
// import { SessionsService } from './sessions.service';
import { formatInTimeZone } from 'date-fns-tz';
import { Public } from '../shared/decorators';

@Controller('statistic')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get('chart-data')
  async getChartData(@Req() request, @Query() query) {
    const userId = request.user.id;

    return this.sessionsService.getChartData({
      userId,
      start: query.start,
      type: query.type,
    });
  }

  @Get('history')
  getHistory(@Req() request, @Query() query) {
    const userId = request.user.id;
    return this.sessionsService.getHistory({ userId, page: query.page });
  }

  @Delete('history/:id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }

  @Get('summary')
  getSummary(@Req() request) {
    const userId = request.user.id;
    return this.sessionsService.getSummary({ userId });
  }

  @Public()
  @Get('top-list')
  getTopList(@Req() request, @Query() query) {
    return this.sessionsService.getTopList({ page: query.page });
  }


}
