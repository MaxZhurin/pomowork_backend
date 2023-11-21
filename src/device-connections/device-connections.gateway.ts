import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  //@ts-ignore
} from '@nestjs/websockets';
import { DeviceConnectionsService } from './device-connections.service';
import { CreateDeviceConnectionDto } from './dto/create-device-connection.dto';
import { UpdateDeviceConnectionDto } from './dto/update-device-connection.dto';

// import {  } from '@nestjs/websockets';
import { Server } from 'socket.io';
import e from 'express';

@WebSocketGateway({ namespace: 'device-connections', cors: true })
export class DeviceConnectionsGateway {
  constructor(
    private readonly deviceConnectionsService: DeviceConnectionsService,
  ) {}

  devices = [];

  @WebSocketServer() server: Server;

  async handleConnection(client: any) {
    const deviceId = client.handshake.query.deviceId;
    console.log('handleConnection', client.id, deviceId);
    const code = this.generateDeviceCode();

    if (this.server.to(client.id).emit('code', { code })) {
      this.devices.push({ id: client.id, code, deviceId });
    }

    console.log('997978-*8--------deviceId', deviceId);
    const device = await this.deviceConnectionsService.findOne(deviceId);
    console.log('//////device', device);
    if (device && device.connected) {
      this.deviceConnectionsService.update(deviceId, { online: true });
    } else {
      this.server.to(client.id).emit('disconnectdevice');
    }
  }

  handleDisconnect(client) {
    console.log('handleDisconnect', client.id);
    const index = this.devices.findIndex(({ id }) => id === client.id);
    if (index !== -1) {
      const device = this.devices[index];

      if (device.deviceId) {
        this.deviceConnectionsService.update(device.deviceId, {
          online: false,
        });
      }

      this.devices.splice(index, 1);
    }
  }

  generateDeviceCode(): number {
    const newCode = Math.floor(1000 + Math.random() * 9000);
    const index = this.devices.findIndex(({ code }) => code === newCode);

    if (index !== -1) {
      return this.generateDeviceCode();
    } else {
      return newCode;
    }
  }

  @SubscribeMessage('connect')
  connect(@MessageBody() createDeviceConnectionDto: CreateDeviceConnectionDto) {
    console.log('connect************connect');
    return false;
  }

  @SubscribeMessage('createDeviceConnection')
  create(@MessageBody() createDeviceConnectionDto: CreateDeviceConnectionDto) {
    console.log('createDeviceConnection');
    return this.deviceConnectionsService.create(createDeviceConnectionDto);
  }

  @SubscribeMessage('removeDeviceConnection')
  remove(@MessageBody() id: number) {
    return this.deviceConnectionsService.remove(id);
  }
}
