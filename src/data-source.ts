import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import { CONNECTION } from './shared/db.connection';

//@ts-ignore
const dataSourceOptions: DataSourceOptions & SeederOptions = {
  ...CONNECTION,
  entities: ['*/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: [`src/database/factories/**/*{.js,.ts}`],
};

export const dataSource = new DataSource(dataSourceOptions);
