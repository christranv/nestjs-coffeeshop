import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';

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
    // Use useFactory, useClass, or useExisting
    // to configure the DataSourceOptions.
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions & SeederOptions> => {
        const config = configService.get<DatabaseConfig>('db.postgres');
        if (config == undefined) throw new Error('Missing DB config');
        return {
            type: 'postgres',
            host: config.url,
            port: config.port,
            username: config.username,
            password: config.password,
            database: config.database,
            autoLoadEntities: true,
            synchronize: true,
            seeds: ['src/**/seeds/*.seeder.ts'],
            logging: true,
        };
    },
    // dataSource receives the configured DataSourceOptions
    // and returns a Promise<DataSource>.
    dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = await new DataSource(options).initialize();
        await runSeeders(dataSource);
        return dataSource;
    },
});

export { persistent };
