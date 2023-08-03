import { DataSource } from "typeorm";

export default new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'pgdb111',
  database: 'coffeeshop',
  logging: true,
  entities: ["src/**/domain/**/*.ts"],
  migrations: ["migrations/*.ts"],
})