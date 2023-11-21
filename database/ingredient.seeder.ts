import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Ingredient } from '..//src/ingredients/entities/ingredient.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Ingredient);
    await repository.insert([
      {
        name: 'qwe',
        unit: 'weight',
      },
    ]);

    // ---------------------------------------------------

    const userFactory = await factoryManager.get(Ingredient);
    // save 1 factory generated entity, to the database
    await userFactory.save();

    // save 5 factory generated entities, to the database
    await userFactory.saveMany(5);
  }
}
