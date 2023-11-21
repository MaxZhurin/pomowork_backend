import { DeviceType } from '../../device-types/entities/device-type.entity';
export class CreateDeviceDto {
  name: string;
  deviceType: number;
  workpoint: number;
  createdBy: number;
}
