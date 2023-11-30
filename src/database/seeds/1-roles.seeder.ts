import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

import { Role as RoleEnum } from '../../shared/roles.enum';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Role);
    await repository.insert([
      {
        name: RoleEnum.ADMIN,
        // firstName: 'Caleb',
        // lastName: 'Barrows',
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
