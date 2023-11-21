import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkpointProductsService } from './workpoint-products.service';
import { CreateWorkpointProductDto } from './dto/create-workpoint-product.dto';
import { UpdateWorkpointProductDto } from './dto/update-workpoint-product.dto';

@Controller('workpoint-products')
export class WorkpointProductsController {
  constructor(private readonly workpointProductsService: WorkpointProductsService) {}

  @Post()
  create(@Body() createWorkpointProductDto: CreateWorkpointProductDto) {
    return this.workpointProductsService.create(createWorkpointProductDto);
  }

  @Get()
  findAll() {
    return this.workpointProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workpointProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkpointProductDto: UpdateWorkpointProductDto) {
    return this.workpointProductsService.update(+id, updateWorkpointProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workpointProductsService.remove(+id);
  }
}
