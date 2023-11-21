import { Ingredient } from './../ingredients/entities/ingredient.entity';
import { Injectable } from '@nestjs/common';
import { QueryDTO } from '@/src/shared/types';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductIngredient } from './entities/product-ingredients.entity';
import { ProductFlow } from './entities/product-flow.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductIngredient)
    private readonly productIngredientRepository: Repository<ProductIngredient>,

    @InjectRepository(ProductFlow)
    private readonly productFlowRepository: Repository<ProductFlow>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    let { productIngredients, productFlows, ...product } = createProductDto;

    const { id: productId } = await this.productRepository.save(product);

    if (productIngredients) {
      productIngredients = productIngredients.map((item, index) => {
        return { ...item, productId, index };
      });
      await this.productIngredientRepository.save(productIngredients);
    }

    if (productFlows) {
      productFlows = productFlows.map((item, index) => {
        return { ...item, productId, index };
      });
      await this.productFlowRepository.save(productFlows);
    }
    return true;
  }

  async findAll(query: QueryDTO) {
    // const res = await this.deviceRepository.find({
    //   relations: {
    //     deviceType: true,
    //   },
    // });
    console.log('-*******productRepository', query);
    // return res;

    const orderObj = {};
    //@ts-ignore
    query.sort.forEach(({ field, order }) => {
      orderObj[field] = order;
    });

    const [list, count] = await this.productRepository.findAndCount({
      relations: {
        productIngredients: true,
        productFlows: true,
      },

      order: orderObj,
      take: query.limit,
      skip: query.offset,
    });
    // const [list, count] = await this.productRepository
    //   .createQueryBuilder('products')
    //   .leftJoinAndSelect('products.productIngredients', 'product-ingredient')
    //   // .orderBy('productIngredients.index', 'ASC')
    //   // .leftJoinAndSelect('devices.workpoint', 'workpoint')
    //   .take(query.limit)
    //   .skip(query.offset)
    //   // .where('workpoint.id IN (:...id)', query.filter)
    //   .getManyAndCount();

    return {
      data: list,
      count: 0,
      total: count,
      page: 0,
      pageCount: 0,
    };
  }

  async findAllByWorkpoint(workpointId) {
    return await this.productRepository.find({
      // where: { workpointId },
      relations: {
        productIngredients: {
          ingredient: true,
        },
        productFlows: true,
      },
      order: {
        productIngredients: {
          index: 'ASC',
        },
        productFlows: {
          index: 'ASC',
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.productRepository.findOne({
      where: { id },
      relations: {
        productIngredients: true,
        productFlows: true,
      },
      order: {
        productIngredients: {
          index: 'ASC',
        },
        productFlows: {
          index: 'ASC',
        },
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    //@ts-ignore
    let { productIngredients, productFlows, ...rest } = updateProductDto;
    if (productIngredients) {
      productIngredients = productIngredients.map((item, index) => {
        return { ...item, productId: id, index };
      });

      await this.productIngredientRepository.delete({ productId: id });
      await this.productIngredientRepository.save(productIngredients);
    }

    if (productFlows) {
      productFlows = productFlows.map((item, index) => {
        return { ...item, productId: id, index };
      });

      await this.productFlowRepository.delete({ productId: id });
      await this.productFlowRepository.save(productFlows);
    }

    //  = //@ts-ignore
    // updateProductDto?
    console.log(rest);
    // return;
    if (Object.keys(rest).length !== 0) {
      this.productRepository
        .createQueryBuilder()
        .update('product')
        .set(rest)
        .where('id = :id', { id })
        .execute();
    }
    return `This action updates a #${id} device`;
  }

  remove(id: string) {
    this.productRepository.softDelete({ id });
    return `This action removes a #${id} product`;
  }
}
