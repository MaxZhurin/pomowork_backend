import { PartialType } from '@nestjs/swagger';
import { CreateWebNotifDto } from './create-web-notif.dto';

export class UpdateWebNotifDto extends PartialType(CreateWebNotifDto) {}
