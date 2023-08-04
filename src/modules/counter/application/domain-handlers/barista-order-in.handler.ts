import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { BaristaItem } from "@src/modules/barista/domain/barista-item";
import { ItemType } from "@src/shared/domain/base/enums/item-type";
import { DateHelper } from "@src/shared/domain/helpers/date-helper";
import { Repository } from "typeorm";
import { BaristaOrderIn } from "../../domain/events/order-in";
import { OrderUpdate } from "../../domain/events/order-update";

@EventsHandler(OrderUpdate)
export class BaristaOrderInHandler implements IEventHandler<OrderUpdate> {

    constructor(private readonly repository: Repository<BaristaOrderIn>) { }

    async handle(event: OrderUpdate): Promise<void> {
        const baristaItem = BaristaItem.from(event.itemType, event.itemName, DateHelper.UTCNow);

        const delay = BaristaOrderInHandler.calculateDelay(event.itemType)
        const timeUp = DateHelper.addSeconds(DateHelper.UTCNow, delay);
        baristaItem.setTimeUp(event.orderId, event.itemLineId, timeUp);

        await this.repository.insert(baristaItem);
    }

    private static calculateDelay(itemType: ItemType) {
        switch (itemType) {
            case ItemType.COFFEE_BLACK:
                return 5
            case ItemType.COFFEE_WITH_ROOM:
                return 5
            case ItemType.ESPRESSO:
                return 7
            case ItemType.ESPRESSO_DOUBLE:
                return 7
            case ItemType.CAPPUCCINO:
                return 10
            default:
                return 3
        }
    }
}