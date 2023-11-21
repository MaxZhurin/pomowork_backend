import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceGroupsService } from './price-groups.service';
import { PriceGroupsController } from './price-groups.controller';
import { PriceGroup } from './entities/price-group.entity';
import { PriceGroupProduct } from './entities/price-group-pdoducts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriceGroup, PriceGroupProduct])],
  controllers: [PriceGroupsController],
  providers: [PriceGroupsService],
})
export class PriceGroupsModule {}
