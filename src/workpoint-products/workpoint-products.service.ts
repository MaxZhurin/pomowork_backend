import { Injectable } from '@nestjs/common';
import { CreateWorkpointProductDto } from './dto/create-workpoint-product.dto';
import { UpdateWorkpointProductDto } from './dto/update-workpoint-product.dto';

@Injectable()
export class WorkpointProductsService {
  create(createWorkpointProductDto: CreateWorkpointProductDto) {
    return 'This action adds a new workpointProduct';
  }

  findAll() {
    return `This action returns all workpointProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workpointProduct`;
  }

  update(id: number, updateWorkpointProductDto: UpdateWorkpointProductDto) {
    return `This action updates a #${id} workpointProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} workpointProduct`;
  }
}
