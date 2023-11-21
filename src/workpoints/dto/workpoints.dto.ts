import { PartialType } from '@nestjs/swagger';

export class CreateWorkpointDto {
  name: string;
}

export class UpdateWorkpointDto extends PartialType(CreateWorkpointDto) {}
