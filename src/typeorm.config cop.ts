import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import { CONNECTION } from './shared/db.connection';

console.log(process.cwd());

//@ts-ignore
const options: DataSourceOptions & SeederOptions = {
  ...CONNECTION,
  entities: ['*/**/*.entity.ts'],
  migrations: ['database/migrations/*.ts'],
  seeds: ['database/**/*{.ts,.js}'],
  // factories: [`src/database/factories/**/*{.js,.ts}`],
};
const AppDataSource = new DataSource(options);
//@ts-ignore
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

(async () => {
  //@ts-ignore
  runSeeders(AppDataSource);
})();

export default AppDataSource;
