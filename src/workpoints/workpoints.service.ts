import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateWorkpointDto, UpdateWorkpointDto } from './dto/workpoints.dto';
import { Workpoint } from './entities/workpoint.entity';
import { ProductsService } from '../products/products.service';

class QueryDTO {
  filter: object;
  range: number[];
  sort: string[];
  limit?: number;
  offset?: number;
}

@Injectable()
export class WorkpointsService {
  constructor(
    @InjectRepository(Workpoint)
    private readonly workpointRepository: Repository<Workpoint>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createWorkpointDto: CreateWorkpointDto): Promise<Workpoint> {
    return await this.workpointRepository.save(createWorkpointDto);
  }
  // /Promise<Workpoint | undefined>
  async update(id: string, updateWorkpointDto: UpdateWorkpointDto) {
    await this.workpointRepository.update(id, updateWorkpointDto);
    return this.workpointRepository.findOne({ where: { id } });
    // .createQueryBuilder()
    // .update(Workpoint)
    // .set(updateWorkpointDto)
    // .where('id = :id', { id })
    // .execute();
  }

  async findAll(query: QueryDTO) {
    console.log('qwqw', query.filter);
    const [list, count] = await this.workpointRepository
      .createQueryBuilder('workpoint')
      .take(query.limit)
      .skip(query.offset)
      // .where('workpoint.id IN (:...id)', query.filter)
      .getManyAndCount();
    return {
      data: list,
      count: 1,
      total: count,
      page: 1,
      pageCount: 1,
    };
  }

  async getWorkpointProducts(id) {
    return await this.productsService.findAllByWorkpoint(id);
  }

  async getWorkpointCategories(id) {
    return await this.productsService.findAllByWorkpoint(id);
  }

  async findOne(id: string) {
    return await this.workpointRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    return await this.workpointRepository.softDelete(id);
  }
}
