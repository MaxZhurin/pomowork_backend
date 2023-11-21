import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Header,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Transform } from 'class-transformer';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@/src/auth/auth.guard';
import { User } from './entities/user.entity';
import { RequestQueryParser } from '@nestjsx/crud-request';
import {
  Crud,
  CrudController,
  ParsedRequest,
  Override,
  CrudRequest,
} from '@nestjsx/crud';

class ListAllEntities {
  // @Transform(({ value }) => JSON.parse(value))
  filter: object;
  // @Transform(({ value }) => JSON.parse(value))
  range: number[];
  // @Transform(({ value }) => JSON.parse(value))
  // sort: string[];
  limit: number;
  page: number;
  sort: string[];
  offset: number;
}

// @Controller('users')
// @Crud({
//   model: {
//     type: User,
//   },
//   query: {
//     exclude: ['id'],
//     join: {
//       roles: {
//         eager: true,
//         exclude: ['id'],

//         // persist: ['id'],
//       },
//       workpoints: {
//         eager: true,
//         // select: false,
//         exclude: ['id'],
//         // alias: 'user.workpoints',
//         // eager: true,
//         // required: true,
//         // persist: ['name'],
//         // allow: ['name'],
//         // eager: true,
//         // require: true,
//         // persist: ['workpoints'],
//         // eager: true,
//       }, // Include related books
//       // profile: {
//       //   persist: ['name'],
//       //   exclude: ['token'],
//       //   eager: true,
//       //   required: true,
//       // },
//     },
//   },
// })
// export class UsersController implements CrudController<User> {
//   constructor(public service: UserService) {}

//   get base(): CrudController<User> {
//     return this;
//   }

//   // @Override()
//   // getMany(
//   //   @ParsedRequest() req: CrudRequest,
//   // ) {
//   //   return this.base.getManyBase(req);
//   // }
// }

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(AuthGuard)
  @Get()
  // @Header('Access-Control-Expose-Headers', 'Content-Range')
  // @Header('Content-Range', 'posts 0-24/319')
  findAll(@Query() query: ListAllEntities, @Req() req: Request) {
    const requestQueryParser = new RequestQueryParser();
    // console.log('-------query', query);
    // console.log(
    //   '-------parseQuery',

    //   requestQueryParser.parseQuery(query),
    // );
    // filter, range, sort
    return this.userService.findAll(query, req);
  }

  // @Get()
  // findByLogin(login: string) {
  //   return this.userService.findByLogin(login);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneMethod(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
