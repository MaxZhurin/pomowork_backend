import { Module } from '@nestjs/common';
import { DeviceConnectionsService } from './device-connections.service';
import { DeviceConnectionsGateway } from './device-connections.gateway';
import { DeviceConnectionsController } from './device-connections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesService } from '../devices/devices.service';
import { Device } from '../devices/entities/device.entity';

@Module({
  // imports: [DevicesService],
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [
    DeviceConnectionsGateway,
    DeviceConnectionsService,
    DevicesService,
  ],
  controllers: [DeviceConnectionsController],
  exports: [DeviceConnectionsGateway, DeviceConnectionsService],
})
export class DeviceConnectionsModule {}
