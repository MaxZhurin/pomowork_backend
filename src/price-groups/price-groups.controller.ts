import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RequestQueryParser } from '@nestjsx/crud-request';
import { PriceGroupsService } from './price-groups.service';
import { CreatePriceGroupDto } from './dto/create-price-group.dto';
import { UpdatePriceGroupDto } from './dto/update-price-group.dto';

import type { QueryDTO } from '@/src/shared/types';

@Controller('price-groups')
export class PriceGroupsController {
  constructor(private readonly priceGroupsService: PriceGroupsService) {}

  @Post()
  create(@Body() createPriceGroupDto: CreatePriceGroupDto) {
    return this.priceGroupsService.create(createPriceGroupDto);
  }

  @Get()
  findAll(@Query() query: QueryDTO) {
    const requestQueryParser = new RequestQueryParser();
    return this.priceGroupsService.findAll(
      //@ts-ignore
      requestQueryParser.parseQuery(query),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceGroupsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePriceGroupDto: UpdatePriceGroupDto,
  ) {
    return this.priceGroupsService.update(id, updatePriceGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceGroupsService.remove(id);
  }
}
