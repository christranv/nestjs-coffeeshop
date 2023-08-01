import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SampleQuery } from '../impl';

@QueryHandler(SampleQuery)
export class SampleQueryHandler implements IQueryHandler<SampleQuery> {
    constructor() { }

    async execute(query: SampleQuery) {
        // console.log(clc.yellowBright('Async GetHeroesQuery...'));
        // return this.repository.findAll();
    }
}
