import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { PriceGroup } from '../../price-groups/entities/price-group.entity';

export default class PriceGroupSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(PriceGroup);
    await repository.insert([
      {
        index: 0,
        name: 'PriceGroup1',
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
