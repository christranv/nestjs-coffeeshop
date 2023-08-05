import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "@src/shared/shared.module";
import { UserController } from "./api/user.controller";
import { DomainEventHandlers } from "./application/domain-handlers";
import { QueryHandlers } from "./application/queries/handlers";
import { User } from "./domain/user";

interface AuthConfig {
  secret: string;
  expireIn: string;
}

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
        const config = configService.get<AuthConfig>('auth.secret');
        if (!config) throw new Error('Missing auth config');
        return {
          global: true,
          secret: config.secret,
          signOptions: { expiresIn: config.expireIn }
        };
      },
    })
  ],
  providers: [...QueryHandlers, ...DomainEventHandlers],
  controllers: [UserController]
})
export class UserModule {
}
