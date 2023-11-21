import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
class QueryDTO {
  filter: object;
  range: number[];
  sort: string[];
  limit?: number;
  offset?: number;
}

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll(query: QueryDTO) {
    // const res = await this.deviceRepository.find({
    //   relations: {
    //     deviceType: true,
    //   },
    // });
    console.log('-*******deviceRepository', query.filter);
    // return res;
    const [list, count] = await this.roleRepository
      .createQueryBuilder('roles')
      // .leftJoinAndSelect('devices.deviceType', 'deviceType')
      // .leftJoinAndSelect('devices.workpoint', 'workpoint')
      .take(query.limit)
      .skip(query.offset)
      // .where('workpoint.id IN (:...id)', query.filter)
      .getManyAndCount();
    return {
      data: list,
      count: 0,
      total: count,
      page: 0,
      pageCount: 0,
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} role`;
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }
}
