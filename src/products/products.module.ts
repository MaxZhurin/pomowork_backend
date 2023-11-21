import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { ProductIngredient } from './entities/product-ingredients.entity';
import { ProductFlow } from './entities/product-flow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductIngredient, ProductFlow]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
