// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
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

  async findOneMethod(id) {
    console.log('id', id);
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['workpoints', 'roles'],
    });

    return {
      ...user,
    };
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async findByLogin(email: string): Promise<User | undefined> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }
}
