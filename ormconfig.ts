import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'pgdb111',
  database: 'coffeeshop',
  logging: true,
  synchronize: false,
  entities: ["src/domain/**/*.ts"],
  migrations: ["src/infrastructure/persistence/migration/**/*.ts"],
  subscribers: ["src/infrastructure/persistence/subscriber/**/*.ts"],
});