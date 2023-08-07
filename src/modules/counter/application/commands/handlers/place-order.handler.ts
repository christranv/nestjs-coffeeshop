import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceOrderCommand } from '@src/modules/counter/domain/commands/place-order.command';
import { Item } from '@src/modules/counter/domain/item';
import { Order } from '@src/modules/counter/domain/order';
import BaseCommandHandler from '@src/shared/application/seedwork/base.handler';
import { ItemType } from '@src/shared/domain/base/enums/item-type';
import { DataSource, In, Repository } from 'typeorm';

@CommandHandler(PlaceOrderCommand)
class PlaceOrderHandler extends BaseCommandHandler<PlaceOrderCommand, void> {
    constructor(
        readonly dataSource: DataSource,
        private readonly publisher: EventPublisher,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {
        super(dataSource)
    }

    async onExecute(command: PlaceOrderCommand): Promise<any> {
        const itemTypes = command.baristaItems.concat(command.kitchenItems).map(_ => _.itemType);
        const items = await this.itemRepository.findBy({ id: In(itemTypes) })
        const itemMap = new Map<ItemType, Item>();
        items.map(item => itemMap.set(item.id, item))

        // const order = Order.from(command, itemMap)
        const order = this.publisher.mergeObjectContext(
            Order.from(command, itemMap)
        );

        await this.orderRepository.insert(order);
        order.getUncommittedEvents()
        order.commit()
    }
}

export default PlaceOrderHandler