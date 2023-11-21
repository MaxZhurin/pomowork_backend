import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DeviceConnectionsService } from './device-connections.service';
import { CreateDeviceConnectionDto } from './dto/create-device-connection.dto';
import { UpdateDeviceConnectionDto } from './dto/update-device-connection.dto';
import { RequestQueryParser } from '@nestjsx/crud-request';
import { DeviceConnectionsGateway } from './device-connections.gateway';

class ListAllEntities {
  // @Transform(({ value }) => JSON.parse(value))
  filter: object;
  // @Transform(({ value }) => JSON.parse(value))
  range: number[];
  // @Transform(({ value }) => JSON.parse(value))
  sort: string[];
}

class PingDto {
  deviceId: string;
}

@Controller('device-connections')
export class DeviceConnectionsController {
  constructor(
    private readonly deviceConnectionsService: DeviceConnectionsService,
    private readonly deviceConnectionsGateway: DeviceConnectionsGateway,
  ) {}

  @Post()
  create(@Body() createDeviceTypeDto: CreateDeviceConnectionDto) {
    console.log('createDeviceTypeDto', createDeviceTypeDto);
    // const index = this.deviceConnectionsGateway.devices.findIndex(({code}) => code === createDeviceConnectionDto.code);
    // if (index !== -1) {
    //   this.deviceConnectionsGateway.server.emit('connected', {qwe: 4,rty: 8});
    // }
    return this.deviceConnectionsService.create({
      devices: this.deviceConnectionsGateway.devices,
      server: this.deviceConnectionsGateway.server,
      ...createDeviceTypeDto,
    });
    return 4;
  }

  @Post('/ping')
  ping(@Body() pingDto: PingDto) {
    console.log('pingDto', pingDto);
    // const index = this.deviceConnectionsGateway.devices.findIndex(({code}) => code === createDeviceConnectionDto.code);
    // if (index !== -1) {
    //   this.deviceConnectionsGateway.server.emit('connected', {qwe: 4,rty: 8});
    // }
    return this.deviceConnectionsService.ping({
      devices: this.deviceConnectionsGateway.devices,
      server: this.deviceConnectionsGateway.server,
      ...pingDto,
    });
  }

  // @Get()
  // findAll(@Query() query: ListAllEntities) {
  //   const requestQueryParser = new RequestQueryParser();
  //   //@ts-ignore
  //   return this.deviceTypesService.findAll(
  //     //@ts-ignore
  //     requestQueryParser.parseQuery(query),
  //   );
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.deviceTypesService.findOne(id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDeviceTypeDto: UpdateDeviceTypeDto,
  // ) {
  //   return this.deviceTypesService.update(id, updateDeviceTypeDto);
  // }

  @Delete(':deviceId')
  remove(@Param('deviceId') deviceId: string) {
    return this.deviceConnectionsService.remove({
      deviceId,
      devices: this.deviceConnectionsGateway.devices,
      server: this.deviceConnectionsGateway.server,
    });
  }
}
