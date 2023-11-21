// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Override, CrudRequestOptions } from '@nestjsx/crud';
import { Request } from 'express';
class QueryDTO {
  filter: object;
  range: number[];
  // sort: string[];
  limit: number;
  page: number;
  sort: string[];
  offset: number;
}

// @Injectable()
// export class UserService extends TypeOrmCrudService<User> {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {
//     super(userRepository);
//   }

//   async findByLogin(login: string): Promise<User | undefined> {
//     return await this.userRepository
//       .createQueryBuilder('user')
//       .where('user.login = :login', { login })
//       .addSelect('user.password')
//       .getOne();
//   }
// }

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(query: QueryDTO, req: Request) {
    // const typeOrmCrudService = new TypeOrmCrudService(this.userRepository);
    // const { parsed, options } = req;
    // console.log('--------CrudRequestOptions', parsed, options);
    // console.log(
    //   '--------TypeOrmCrudService',
    //   //@ts-ignore
    //   typeOrmCrudService.createBuilder(query, { options }),
    // );
    const users = await this.userRepository.find({
      // order: {
      //   [query.sort[0]]: query.sort[0],
      // },
      relations: ['workpoints', 'roles'],
      skip: query.offset,
      take: query.limit,
    });
    // const users = await this.userRepository.find({
    //   order: {
    //     [query.sort[0]]: query.sort[0],
    //   },
    //   relations: ['workpoints', 'roles'],
    // });

    return {
      data: users.map((user) => {
        return {
          ...user,
          workpoints: user.workpoints.map(({ id }) => id),
        };
      }),
      count: 1,
      total: 1,
      page: 1,
      pageCount: 1,
    };
    // return await this.userRepository
    //   .createQueryBuilder('user')
    //   .leftJoinAndMapMany(
    //     'user.workpointsIds',
    //     'user.workpoints',
    //     // 'workpoints',
    //     'workpoints.id',
    //   )
    //   .printSql()
    //   // .where('workpoint.id IN (:...workpoints)', {workpoints})
    //   .getMany();
    // .leftJoinAndMapMany(
    //   'user.workpointsIds',
    //   'user.workpoints',
    //   'workpoints.id',
    // )
    // .getMany();
  }

  async findOneMethod(id) {
    console.log('id', id);
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['workpoints', 'roles'],
    });

    return {
      ...user,
      workpoints: user.workpoints.map(({ id }) => id),
      roles: user.roles.map(({ id }) => id),
    };
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async findByLogin(login: string): Promise<User | undefined> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.login = :login', { login })
      .addSelect('user.password')
      .getOne();
  }
}
