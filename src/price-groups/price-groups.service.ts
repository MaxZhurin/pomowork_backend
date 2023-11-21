import { Injectable } from '@nestjs/common';
import { QueryDTO } from '@/src/shared/types';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePriceGroupDto } from './dto/create-price-group.dto';
import { UpdatePriceGroupDto } from './dto/update-price-group.dto';
import { PriceGroup } from './entities/price-group.entity';

@Injectable()
export class PriceGroupsService {
  constructor(
    @InjectRepository(PriceGroup)
    private readonly priceGroupRepository: Repository<PriceGroup>,
  ) {}

  async create(createPriceGroupDto: CreatePriceGroupDto) {
    return await this.priceGroupRepository.save(createPriceGroupDto);
  }

  async findAll(query: QueryDTO) {
    // const res = await this.deviceRepository.find({
    //   relations: {
    //     deviceType: true,
    //   },
    // });
    console.log('-*******ingredient', query, query.filter);
    // return res;
    const [list, count] = await this.priceGroupRepository
      .createQueryBuilder('priceGroups')
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
    return await this.priceGroupRepository.findOne({ where: { id } });
  }

  async update(id: string, updatePriceGroupDto: UpdatePriceGroupDto) {
    this.priceGroupRepository
      .createQueryBuilder()
      .update('priceGroup')
      .set(updatePriceGroupDto)
      .where('id = :id', { id })
      .execute();
    return `This action updatePriceGroupDto a #${id} device`;
  }

  remove(id: string) {
    return `This action removes a #${id} priceGroup`;
  }
}
