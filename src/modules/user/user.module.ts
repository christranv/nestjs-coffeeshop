import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "@src/shared/shared.module";
import { AuthController } from "./api/auth.controller";
import AuthConfig from "./api/auth/auth.config";
import { JwtStrategy } from "./api/auth/jwt.strategy";
import { LocalStrategy } from "./api/auth/local.strategy";
import { DomainEventHandlers } from "./application/domain-handlers";
import { QueryHandlers } from "./application/queries/handlers";
import { User } from "./domain/user";

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
        const config = configService.get<AuthConfig>('auth');
        if (!config) throw new Error('Missing auth config');
        return {
          global: true,
          secret: config.secret,
          signOptions: { expiresIn: config.expireIn }
        };
      },
    }),
  ],
  providers: [
    ...QueryHandlers,
    ...DomainEventHandlers,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class UserModule {
}
