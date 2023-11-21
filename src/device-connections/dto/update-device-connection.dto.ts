import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceConnectionDto } from './create-device-connection.dto';

export class UpdateDeviceConnectionDto extends PartialType(
  CreateDeviceConnectionDto,
) {
  // id: string;
  online: boolean;
}
