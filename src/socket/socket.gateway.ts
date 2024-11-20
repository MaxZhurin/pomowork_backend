import { TimerService } from './../timer/timer.service';
import { SettingsService } from './../settings/settings.service';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
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
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { AuthGuard } from '@/src/auth/auth.guard';
import { webpush } from '@/src/webpush';
import { WebNotifService } from '../web-notif/web-notif.service';
import { SessionsService } from '../sessions/sessions.service';
import { addDays, addSeconds } from 'date-fns';

@WebSocketGateway({ namespace: 'socket-api', cors: true })
export class SocketGateway {
  constructor(
    private readonly socketService: SocketService,
    private readonly webNotifService: WebNotifService,
    private readonly settingsService: SettingsService,
    private readonly timerService: TimerService,
    private readonly sessionService: SessionsService,
  ) {}

  private timerIds = {};

  @WebSocketServer() private server: any;
  wsClients = [];
  afterInit() {
    console.log('afterInit');
    this.server.emit('testing', { do: 'stuff' });
  }

  handleConnection(client: any, data) {
    console.log('handleConnection', client.user, data);
    this.wsClients.push(client);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('connection')
  handleRooms(client: any, data) {
    // console.log('handleRooms', this.server, client.id, data)
    client.join(client.user.id);
    // this.server.sockets.join(client.user.id);
    // this.wsClients.push(client);
  }

  handleDisconnect(client) {
    // console.log('handleDisconnect')
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i].id === client.id) {
        this.wsClients.splice(i, 1);
        break;
      }
    }

    // this.broadcast('disconnect',{});
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('start')
  async start(client, data: { date: Date }, inner = false) {
    console.log('data', data);

    const userId = client.user.id;
    // let leftSec = data?.leftSec

    // if (!leftSec) {
    // startDate: number;
    // startSec: number;
    // lastStartDate: Date;
    // lastStartSec: Date;
    // pauseSec: number;

    const timer = await this.timerService.getTimer(userId);
    const settings = await this.settingsService.getSettings(userId);

    let nextTime = settings.workTime * 60;
    if (timer.step === 'SHORT') nextTime = settings.shortTime * 60;
    if (timer.step === 'LONG') nextTime = settings.longTime * 60;
    if (timer.pauseSec) nextTime = timer.pauseSec;

    await this.timerService.updateTimer(userId, {
      isActive: true,
      startDate: timer.pauseSec ? timer.startDate : data.date,
      startSec: timer.pauseSec ? timer.startSec : nextTime,
      lastStartDate: data.date,
      lastStartSec: nextTime,
      pauseSec: null,
    });

    if (inner) {
      this.server.to(client.user.id).emit('start', {
        step: timer.step,
        timeSec: nextTime,
      });
    } else {
      this.server.to(client.user.id).except(client.id).emit('start', {
        step: timer.step,
        timeSec: nextTime,
      });
    }
    console.log('nextTime', nextTime);
    // }

    // this.socketService.saveTimer(userId, {
    //   finishTime: Date.now() + leftSec * 1000,
    // });

    // clearTimeout(this.timerIds[userId]);

    this.timerIds[userId] = setTimeout(async () => {
      const timer = await this.timerService.getTimer(userId);
      const settings = await this.settingsService.getSettings(userId);

      this.webNotifService.sendNotification({
        userId,
        message: `${timer.step} finish!`,
      });

      if (timer.step === 'LONG') {
        await this.timerService.updateTimer(userId, {
          step: 'WORK',
          isActive: false,
          finishedWorks: 0,
          startDate: null,
          startSec: 0,
          lastStartDate: null,
          lastStartSec: 0,
        });

        await this.sessionService.create({
          userId,
          startDate: timer.startDate,
          finishDate: addSeconds(timer.lastStartDate, timer.lastStartSec),
          time: timer.startSec,
          step: timer.step,
        });
      }

      if (timer.step === 'SHORT') {
        const startTime = settings.autoStartWorks
          ? addSeconds(timer.lastStartDate, timer.lastStartSec)
          : 0;

        await this.timerService.updateTimer(userId, {
          step: 'WORK',
          isActive: false,
          startDate: null,
          startSec: 0,
          lastStartDate: null,
          lastStartSec: 0,
        });

        await this.sessionService.create({
          userId,
          startDate: timer.startDate,
          finishDate: addSeconds(timer.lastStartDate, timer.lastStartSec),
          time: timer.startSec,
          step: timer.step,
        });

        if (settings.autoStartWorks) {
          // this.server.to(client.user.id).emit('start', {
          //   step: 'WORK',
          //   startTime,
          // });

          this.start(
            client,
            { date: addSeconds(timer.lastStartDate, timer.lastStartSec) },
            true,
          );
          return;
        }
      }

      if (timer.step === 'WORK') {
        const nextStep =
          settings.longBreakInterval === timer.finishedWorks + 1
            ? 'LONG'
            : 'SHORT';
        const nextTime =
          nextStep === 'LONG' ? settings.longTime : settings.shortTime;
        const startTime = settings.autoStartBreaks ? Date.now() : 0;

        await this.timerService.updateTimer(userId, {
          step: nextStep,
          isActive: false,
          startDate: null,
          startSec: 0,
          lastStartDate: null,
          lastStartSec: 0,
          finishedWorks: timer.finishedWorks + 1,
        });

        await this.sessionService.create({
          userId,
          startDate: timer.startDate,
          finishDate: addSeconds(timer.lastStartDate, timer.lastStartSec),
          time: timer.startSec,
          step: timer.step,
        });

        if (settings.autoStartBreaks) {
          // this.server.to(client.user.id).emit('start', {
          //   step: nextStep,
          //   startTime,
          // });
          this.start(
            client,
            { date: addSeconds(timer.lastStartDate, timer.lastStartSec) },
            true,
          );
          return;
        }
      }

      this.server.to(userId).emit('stop');
      this.server.to(userId).emit('sync-timer');
    }, nextTime * 1000);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('stop')
  async stop(client, data: { pauseSec: number }) {
    const userId = client.user.id;

    clearTimeout(this.timerIds[userId]);

    await this.timerService.updateTimer(userId, {
      isActive: false,
      pauseSec: data.pauseSec,
    });
    this.server.to(client.user.id).except(client.id).emit('stop');
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('sync-timer')
  syncTimer(client, data) {
    console.log('data', data);
    this.socketService.saveTimer(client.user.id, data);
    this.server.to(client.user.id).except(client.id).emit('sync-timer');
  }

  @SubscribeMessage('findAllSocket')
  findAll() {
    return this.socketService.findAll();
  }

  @SubscribeMessage('findOneSocket')
  findOne(@MessageBody() id: number) {
    return this.socketService.findOne(id);
  }

  @SubscribeMessage('updateSocket')
  update(@MessageBody() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(updateSocketDto.id, updateSocketDto);
  }

  @SubscribeMessage('removeSocket')
  remove(@MessageBody() id: number) {
    return this.socketService.remove(id);
  }
}
