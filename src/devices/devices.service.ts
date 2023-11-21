import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

class QueryDTO {
  filter: object;
  range: number[];
  sort: string[];
  limit?: number;
  offset?: number;
}

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto) {
    //@ts-ignore
    console.log(' async create(createDeviceDto:');
    const device = new Device();
    device.name = createDeviceDto.name;

    device.deviceTypeId = createDeviceDto.deviceType;

    device.createdById = createDeviceDto.createdBy;

    device.workpointId = createDeviceDto.workpoint;
    const res = await this.deviceRepository.save(device);
    console.log('res', res);
    return res;
  }

  async findAll(query: QueryDTO) {
    // const res = await this.deviceRepository.find({
    //   relations: {
    //     deviceType: true,
    //   },
    // });
    console.log('-*******deviceRepository', query.filter);
    // return res;
    const [list, count] = await this.deviceRepository
      .createQueryBuilder('devices')
      // .leftJoinAndSelect('devices.deviceType', 'deviceType')
      // .leftJoinAndSelect('devices.workpoint', 'workpoint')
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
    return await this.deviceRepository.findOne({ where: { id } });
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    this.deviceRepository
      .createQueryBuilder()
      .update('device')
      .set(updateDeviceDto)
      .where('id = :id', { id })
      .execute();
    // (id, updateDeviceDto);
    return `This action updates a #${id} device`;
  }

  async remove(id: string) {
    return `This action removes a #${id} device`;
  }
}
