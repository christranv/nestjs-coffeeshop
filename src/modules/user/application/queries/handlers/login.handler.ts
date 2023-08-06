import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/user';
import { LoginQuery } from '../impl';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) { }

    async execute(query: LoginQuery) {
        return await this.repository.findOneBy({ username: query.username });
    }
}
