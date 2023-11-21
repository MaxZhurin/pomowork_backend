import { PartialType } from '@nestjs/swagger';
import { CreateDeviceDto } from './create-device.dto';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  connected?: boolean;
  connectedAt?: Date;
  online?: boolean;
}
