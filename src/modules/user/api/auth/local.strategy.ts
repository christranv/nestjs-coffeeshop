import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginQuery } from '../../application/queries/impl';
import { User } from '../../domain/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly queryBus: QueryBus) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const query = new LoginQuery(username, password)
        const user = await this.queryBus.execute<LoginQuery, User>(query);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
