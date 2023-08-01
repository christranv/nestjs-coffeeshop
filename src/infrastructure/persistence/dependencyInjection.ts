import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

interface DatabaseConfig {
  url: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const persistent = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const config = configService.get<DatabaseConfig>('db.postgres');
    if (config == undefined) throw new Error('Missing DB config');
    return {
      type: 'postgres',
      host: config.url,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [__dirname + '/../../domain/**/*{.ts,.js}'],
      synchronize: true,
      migrations: [
        "src/infrastructure/persistence/migration/**/*.ts"
      ],
      subscribers: [
        "src/infrastructure/persistence/subscriber/**/*.ts"
      ],
      logging: true,
    };
  },
});

export { persistent };
