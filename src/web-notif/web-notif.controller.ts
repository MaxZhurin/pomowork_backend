import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WebNotifService } from './web-notif.service';
import { CreateWebNotifDto } from './dto/create-web-notif.dto';
import { UpdateWebNotifDto } from './dto/update-web-notif.dto';
import { Public } from '@/src/shared/decorators';
import { webpush } from '@/src/webpush';

@Controller('web-notif')
export class WebNotifController {
  constructor(private readonly webNotifService: WebNotifService) {}

  // @Public()
  @Post('subscription')
  create(@Req() request, @Body() subscription: CreateWebNotifDto) {
    // console.log(request.user.id);
    this.webNotifService.saveSubscription({
      userId: request.user.id,
      subscription: JSON.stringify(subscription),
    });
    // console.log('subscription//////////////', subscription);

    // setTimeout(() => {
    //   webpush.sendNotification(pushSubscription, 'message 888');
    // }, 5000)

    // return this.webNotifService.create(createWebNotifDto);
  }

  // @Public()
  @Get('pubkey')
  findAll() {
    return {
      pubkey: process.env.PUSH_NOTIF_PUBLIC_KEY,
    };
  }
}
