import { Module } from '@nestjs/common';
import { DeviceTypesService } from './device-types.service';
import { DeviceTypesController } from './device-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceType } from './entities/device-type.entity';
import { DeviceConnectionsGateway } from "../device-connections/device-connections.gateway"
// import {DeviceConnectionsModule} from "../device-connections/device-connections.module"
// import { DeviceConnectionsService } from "../device-connections/device-connections.service"
@Module({
  imports: [TypeOrmModule.forFeature([DeviceType])],
  controllers: [DeviceTypesController],
  providers: [DeviceTypesService  ],
})
export class DeviceTypesModule {}
