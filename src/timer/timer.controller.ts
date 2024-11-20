import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Header,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Transform } from 'class-transformer';
import { TimerService } from './timer.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@/src/auth/auth.guard';
import { User } from '../database/entities/user.entity';
import { RequestQueryParser } from '@nestjsx/crud-request';
import {
  Crud,
  CrudController,
  ParsedRequest,
  Override,
  CrudRequest,
} from '@nestjsx/crud';

class ListAllEntities {
  // @Transform(({ value }) => JSON.parse(value))
  filter: object;
  // @Transform(({ value }) => JSON.parse(value))
  range: number[];
  // @Transform(({ value }) => JSON.parse(value))
  // sort: string[];
  limit: number;
  page: number;
  sort: string[];
  offset: number;
}

@Controller('timer')
export class TimerController {
  constructor(private readonly TimerService: TimerService) {}

  // @UseGuards(AuthGuard)
  // @Get()
  // findAll(@Query() query: ListAllEntities, @Req() req: Request) {
  //   const requestQueryParser = new RequestQueryParser();
  //   // console.log('-------query', query);
  //   // console.log(
  //   //   '-------parseQuery',

  //   //   requestQueryParser.parseQuery(query),
  //   // );
  //   // filter, range, sort
  //   return this.TimerService.findAll(query, req);
  // }

  // @Get()
  // findByLogin(login: string) {
  //   return this.TimerService.findByLogin(login);
  // }

  @Get()
  getTimer(@Req() request) {
    console.log(request.user.id)
    return this.TimerService.getTimer(request.user.id);
  }
}
