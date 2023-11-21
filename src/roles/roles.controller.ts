import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RequestQueryParser } from '@nestjsx/crud-request';
class ListAllEntities {
  // @Transform(({ value }) => JSON.parse(value))
  filter: object;
  // @Transform(({ value }) => JSON.parse(value))
  range: number[];
  // @Transform(({ value }) => JSON.parse(value))
  sort: string[];
}

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    const requestQueryParser = new RequestQueryParser();
    // console.log('-------query', query);
    // console.log(
    //   '-------parseQuery',

    //   requestQueryParser.parseQuery(query),
    // );
    //@ts-ignore
    return this.rolesService.findAll(requestQueryParser.parseQuery(query));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
