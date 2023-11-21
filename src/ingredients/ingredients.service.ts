import { Injectable } from '@nestjs/common';
import { QueryDTO } from '@/src/shared/types';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    return await this.ingredientRepository.save(createIngredientDto);
  }

  async findAll(query: QueryDTO) {
    // const res = await this.deviceRepository.find({
    //   relations: {
    //     deviceType: true,
    //   },
    // });
    console.log('-*******ingredient', query, query.filter);
    // return res;
    const [list, count] = await this.ingredientRepository
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

  async findOne(id: string) {
    return await this.ingredientRepository.findOne({ where: { id } });
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    this.ingredientRepository
      .createQueryBuilder()
      .update('ingredient')
      .set(updateIngredientDto)
      .where('id = :id', { id })
      .execute();
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredients`;
  }
}
