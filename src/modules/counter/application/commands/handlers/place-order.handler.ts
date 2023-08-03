import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceOrderCommand } from '@src/modules/counter/domain/commands/place-order.command';
import { Item } from '@src/modules/counter/domain/item';
import { Order } from '@src/modules/counter/domain/order';
import { ItemType } from '@src/shared/domain/base/enums/item-type';
import { In, Repository } from 'typeorm';

@CommandHandler(PlaceOrderCommand)
export class PlaceOrderHandler implements ICommandHandler<PlaceOrderCommand> {
    constructor(
        private readonly publisher: EventPublisher,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) { }

    async execute(command: PlaceOrderCommand) {
        if (!command) {
            throw new Error("Invalid")
        }

        const itemTypes = command.baristaItems.concat(command.kitchenItems).map(_ => _.itemType);
        const items = await this.itemRepository.findBy({ id: In(itemTypes) })
        const itemMap = new Map<ItemType, Item>();
        items.map(item => itemMap.set(item.id, item))

        const order = Order.from(command, itemMap);
        await this.orderRepository.insert(order);
    }
}
