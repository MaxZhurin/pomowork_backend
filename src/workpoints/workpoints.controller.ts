import {
  Controller,
  Header,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Transform } from 'class-transformer';
import { WorkpointsService } from './workpoints.service';
import { CreateWorkpointDto, UpdateWorkpointDto } from './dto/workpoints.dto';
import { ProductsService } from '../products/products.service';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
class ListAllEntities {
  // @Transform(({ value }) => JSON.parse(value))
  filter: object;
  // @Transform(({ value }) => JSON.parse(value))
  range: number[];
  // @Transform(({ value }) => JSON.parse(value))
  sort: string[];
}

@Controller('workpoints')
export class WorkpointsController {
  constructor(
    private readonly workpointsService: WorkpointsService,
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Post()
  create(@Body() createWorkpointDto: CreateWorkpointDto) {
    return this.workpointsService.create(createWorkpointDto);
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return this.workpointsService.findAll(query);
  }

  @Get(':id/products')
  getWorkpointProducts(@Param('id') id: string) {
    return this.workpointsService.getWorkpointProducts(id);
  }

  @Get(':id/categories')
  getWorkpointCategories(@Param('id') id: number) {
    return this.productCategoriesService.findAllByWorkpoint(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workpointsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkpointDto: UpdateWorkpointDto,
  ) {
    return this.workpointsService.update(id, updateWorkpointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workpointsService.remove(id);
  }
}
