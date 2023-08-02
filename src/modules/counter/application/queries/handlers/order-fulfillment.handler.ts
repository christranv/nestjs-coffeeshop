import { Order } from '@/src/domain/counter/order';
import { OrderStatus } from '@/src/domain/counter/order-status';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetFulfilledOrdersQuery } from '../impl';

@QueryHandler(GetFulfilledOrdersQuery)
export class GetFulfilledOrdersHandler
    implements IQueryHandler<GetFulfilledOrdersQuery> {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) { }

    async execute(query: GetFulfilledOrdersQuery) {
        return this.orderRepository.findBy({
            orderStatus: OrderStatus.FULFILLED
        });
    }
}
