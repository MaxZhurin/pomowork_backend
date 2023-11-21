import { PartialType } from '@nestjs/swagger';
import { CreateWorkpointProductDto } from './create-workpoint-product.dto';

export class UpdateWorkpointProductDto extends PartialType(CreateWorkpointProductDto) {}
