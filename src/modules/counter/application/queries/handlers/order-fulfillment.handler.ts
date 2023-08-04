import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '@src/modules/counter/domain/order';
import { OrderStatus } from '@src/modules/counter/domain/order-status';
import { Repository } from 'typeorm';
import { GetFulfilledOrdersQuery } from '../impl';

@QueryHandler(GetFulfilledOrdersQuery)
export class GetFulfilledOrdersHandler implements IQueryHandler<GetFulfilledOrdersQuery> {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) { }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(_: GetFulfilledOrdersQuery): Promise<Order[]> {
        return await this.orderRepository.findBy({
            orderStatus: OrderStatus.FULFILLED
        });
    }
}
