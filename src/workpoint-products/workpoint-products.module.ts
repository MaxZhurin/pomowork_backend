import { Module } from '@nestjs/common';
import { WorkpointProductsService } from './workpoint-products.service';
import { WorkpointProductsController } from './workpoint-products.controller';

@Module({
  controllers: [WorkpointProductsController],
  providers: [WorkpointProductsService],
})
export class WorkpointProductsModule {}
