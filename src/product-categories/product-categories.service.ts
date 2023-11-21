import { Injectable } from '@nestjs/common';
import { QueryDTO } from '@/src/shared/types';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    return await this.productCategoryRepository.save(createProductCategoryDto);
  }

  async findAll(query: QueryDTO) {
    // const res = await this.deviceRepository.find({
    //   relations: {
    //     deviceType: true,
    //   },
    // });
    console.log('-*******deviceRepository', query.filter);
    // return res;
    const [list, count] = await this.productCategoryRepository
      .createQueryBuilder('ingredients')
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

  async findAllByWorkpoint(workpointId: number) {
    return await this.productCategoryRepository.find({
      where: { workpointId },
    });
  }

  async findOne(id: string) {
    return await this.productCategoryRepository.findOne({ where: { id } });
  }

  async update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    this.productCategoryRepository
      .createQueryBuilder()
      .update('ingredient')
      .set(updateProductCategoryDto)
      .where('id = :id', { id })
      .execute();
    return `This action updates a #${id} device`;
  }

  remove(id: string) {
    return `This action removes a #${id} productCategory`;
  }
}
