import { DataSource, DataSourceOptions } from "typeorm";

const options: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'pgdb111',
  database: 'coffeeshop',
  logging: true,
  synchronize: false,
  entities: ["src/domain/**/*{.ts,.js}"],
  migrations: ["src/infrastructure/persistence/migration/**/*.ts"],
  subscribers: ["src/infrastructure/persistence/subscriber/**/*.ts"],
};

export default new DataSource(options);