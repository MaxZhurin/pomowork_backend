import { ProductsModule } from './../products/products.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkpointsService } from './workpoints.service';
import { WorkpointsController } from './workpoints.controller';
import { Workpoint } from './entities/workpoint.entity';
import { ProductsService } from '../products/products.service';
import { ProductIngredient } from '../products/entities/product-ingredients.entity';
import { ProductFlow } from '../products/entities/product-flow.entity';
import { Product } from '../products/entities/product.entity';
import { ProductCategoriesModule } from '../product-categories/product-categories.module';
// import { ProductsModule } from '../products/products.service';

@Module({
  imports: [
    ProductCategoriesModule,
    TypeOrmModule.forFeature([
      Workpoint,
      Product,
      ProductIngredient,
      ProductFlow,
    ]),
  ],
  controllers: [WorkpointsController],
  providers: [WorkpointsService, ProductsService],
  exports: [WorkpointsService],
})
export class WorkpointsModule {}
