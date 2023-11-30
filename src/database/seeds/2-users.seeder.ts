import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

import { Role as RoleEnum } from '../../shared/roles.enum';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    const rolesRepository = dataSource.getRepository(Role);
    const role = await rolesRepository.findOne({ where: { id: 1 } });
    await repository.insert([
      {
        login: 'qwe@qwe.qwe',
        password: 'qweqwe',
        firstName: 'Caleb',
        lastName: 'Barrows',

        // login: 'caleb.barrows@gmail.com',
        // password: 'qweqwe',
      },
    ]);

    // ---------------------------------------------------

    // const userFactory = await factoryManager.get(Role);
    // save 1 factory generated entity, to the database
    // return await userFactory.save();

    // save 5 factory generated entities, to the database
    // await userFactory.saveMany(5);
  }
}
