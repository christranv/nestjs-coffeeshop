import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginQuery } from '../../application/queries/impl';
import { BcryptHelper } from '../../domain/helpers/bcrypt.helper';
import { User } from '../../domain/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly queryBus: QueryBus) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        const query = new LoginQuery(username, password)
        const user = await this.queryBus.execute<LoginQuery, User>(query);
        if (!user)
            throw new NotFoundException("User not found.");
        const isMatch = await BcryptHelper.isMatch(query.password, user.hashedPassword);
        if (!isMatch)
            throw new BadRequestException("Username or password not match.");
        return user;
    }
}
