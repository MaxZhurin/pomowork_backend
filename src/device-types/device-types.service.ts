import { Injectable } from '@nestjs/common';
import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { DeviceType } from './entities/device-type.entity';

class QueryDTO {
  filter: object;
  range: number[];
  sort: string[];
  limit?: number;
  offset?: number;
}

@Injectable()
export class DeviceTypesService {
  constructor(
    @InjectRepository(DeviceType)
    private readonly deviceTypeRepository: Repository<DeviceType>,

    // private readonly deviceConnectionsGateway: DeviceConnectionsGateway
  ) {}

  async create(createDeviceTypeDto: CreateDeviceTypeDto) {
    return await this.deviceTypeRepository.save(createDeviceTypeDto);
  }

  async findAll(query: QueryDTO) {
    console.log('//////******deviceTypeRepository', query.filter);
    const [list, count] = await this.deviceTypeRepository
      .createQueryBuilder('deviceTypes')
      .take(query.limit)
      .skip(query.offset)
      // .where('workpoint.id IN (:...id)', query.filter)
      .getManyAndCount();
    return {
      data: list,
      count: 0,
      total: count,
      page: 0,
      pageCount: 0,
    };
  }

  async findOne(id: string) {
    return await this.deviceTypeRepository.findOne({ where: { id } });
  }

  async update(id: string, updateDeviceTypeDto: UpdateDeviceTypeDto) {
    await this.deviceTypeRepository.update(id, updateDeviceTypeDto);
    return this.deviceTypeRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return `This action removes a #${id} deviceType`;
  }
}
