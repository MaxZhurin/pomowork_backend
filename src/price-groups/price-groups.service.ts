import { Injectable } from '@nestjs/common';
import { QueryDTO } from '@/src/shared/types';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePriceGroupDto } from './dto/create-price-group.dto';
import { UpdatePriceGroupDto } from './dto/update-price-group.dto';
import { PriceGroup } from './entities/price-group.entity';
import { PriceGroupProduct } from './entities/price-group-pdoducts.entity';

@Injectable()
export class PriceGroupsService {
  constructor(
    @InjectRepository(PriceGroup)
    private readonly priceGroupRepository: Repository<PriceGroup>,

    @InjectRepository(PriceGroupProduct)
    private readonly priceGroupProductRepository: Repository<PriceGroupProduct>,
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
    const orderObj = {};
    //@ts-ignore
    query.sort.forEach(({ field, order }) => {
      orderObj[field] = order;
    });

    console.log('-*******ingredient', query, query.filter);
    // return res;
    const [list, count] = await this.priceGroupRepository.findAndCount({
      relations: {
        priceGroupProducts: true,
      },
      order: orderObj,
      take: query.limit,
      skip: query.offset,
    });
    return {
      data: list,
      count: 0,
      total: count,
      page: 0,
      pageCount: 0,
    };
  }

  async findOne(id: string) {
    return await this.priceGroupRepository.findOne({
      where: { id },
      relations: {
        priceGroupProducts: true,
      },
      order: {
        priceGroupProducts: {
          index: 'ASC',
        },
      },
    });
  }

  async update(id: string, updatePriceGroupDto: UpdatePriceGroupDto) {
    let { priceGroupProducts, ...rest } = updatePriceGroupDto;
    if (priceGroupProducts) {
      priceGroupProducts = priceGroupProducts.map((item, index) => {
        return { ...item, priceGroupId: id, index };
      });

      await this.priceGroupProductRepository.delete({ priceGroupId: id });
      await this.priceGroupProductRepository.save(priceGroupProducts);
    }

    console.log('rest', rest);

    if (Object.keys(rest).length !== 0) {
      this.priceGroupRepository
        .createQueryBuilder()
        .update(PriceGroup)
        .set(rest)
        .where('id = :id', { id })
        .execute();
    }
    return `This action updatePriceGroupDto a #${id} device`;
  }

  remove(id: string) {
    return `This action removes a #${id} priceGroup`;
  }
}
