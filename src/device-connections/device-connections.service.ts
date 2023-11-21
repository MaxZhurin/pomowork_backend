import { Injectable } from '@nestjs/common';
import { CreateDeviceConnectionDto } from './dto/create-device-connection.dto';
import { UpdateDeviceConnectionDto } from './dto/update-device-connection.dto';
import { DeviceConnectionsGateway } from './device-connections.gateway';
import { DevicesService } from '../devices/devices.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from '../devices/entities/device.entity';

@Injectable()
export class DeviceConnectionsService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceTypeRepository: Repository<Device>,

    private readonly devicesService: DevicesService,
  ) {}

  create(data: any) {
    const { code, deviceId, workpointId, deviceTypeId } = data;
    // console.log(data);
    const index = data.devices.findIndex(({ code }) => code === data.code);
    console.log('vindexindexindex', index, data.devices);
    if (index !== -1) {
      const currentDevice = data.devices[index];

      if (currentDevice.deviceId) {
        this.devicesService.update(currentDevice.deviceId, {
          connected: false,
          connectedAt: null,
          online: false,
        });
      }

      const connected = data.server
        .to(data.devices[index].id)
        .emit('connected', {
          deviceId,
          workpointId,
          deviceTypeId,
        });

      data.devices[index].deviceId = deviceId;
      console.log('///////connected', connected);
      if (connected) {
        this.devicesService.update(deviceId, {
          connected: true,
          connectedAt: new Date(),
          online: true,
        });
      }
    }

    return;
  }

  ping(data) {
    console.log('ping', data.deviceId);
    const index = data.devices.findIndex(
      ({ deviceId }) => deviceId === data.deviceId,
    );
    console.log(index, data.devices);
    if (index !== -1) {
      const currentDevice = data.devices[index];

      console.log('sended', data.server.to(currentDevice.id).emit('ping'));
    }
  }

  async findOne(id: string) {
    return await this.devicesService.findOne(id);
  }

  async update(
    deviceId: string,
    updateDeviceConnectionDto: UpdateDeviceConnectionDto,
  ) {
    this.devicesService.update(deviceId, updateDeviceConnectionDto);

    return `This action updates a #${deviceId} deviceConnection`;
  }

  remove(data: any) {
    const index = data.devices.findIndex(
      ({ deviceId }) => deviceId === data.deviceId,
    );
    console.log('indexindexindexindex', index, data.deviceId, data.devices);
    if (index !== -1) {
      const currentDevice = data.devices[index];
      data.server.to(currentDevice.id).emit('disconnectdevice');
    }

    this.devicesService.update(data.deviceId, {
      connected: false,
      connectedAt: null,
      online: false,
    });

    return;
  }
}
