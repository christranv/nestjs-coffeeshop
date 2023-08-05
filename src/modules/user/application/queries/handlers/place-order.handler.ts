import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptHelper } from '@src/modules/user/domain/helpers/bcrypt.helper';
import { Repository } from 'typeorm';
import { User } from '../../../domain/user';
import { LoginQuery } from '../impl';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async execute(query: LoginQuery) {
        const user = await this.repository.findOneBy({ username: query.username });
        if (!user)
            throw new NotFoundException("User not found.");
        if (!BcryptHelper.isMatch(query.password, user.hashedPassword))
            throw new NotFoundException("Username or password not match.");

        const payload = { sub: user.id, username: user.username, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };

    }
}
