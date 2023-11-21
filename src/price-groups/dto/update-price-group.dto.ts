import { PartialType } from '@nestjs/swagger';
import { CreatePriceGroupDto } from './create-price-group.dto';

export class UpdatePriceGroupDto extends PartialType(CreatePriceGroupDto) {}
