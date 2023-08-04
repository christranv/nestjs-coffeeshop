import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { BaristaOrderIn, KitchenOrderIn } from "@src/modules/counter/domain/events/order-in";
import { ItemType } from "@src/shared/domain/base/enums/item-type";
import { DateHelper } from "@src/shared/domain/helpers/date-helper";
import { Repository } from "typeorm";
import { KitchenOrder } from "../../domain/kitchen-order";

@EventsHandler(BaristaOrderIn)
export class KitchenOrderInHandler implements IEventHandler<KitchenOrderIn> {

    constructor(private readonly repository: Repository<KitchenOrderIn>) { }

    async handle(event: KitchenOrderIn): Promise<void> {
        const kitchenOrder = KitchenOrder.from(event.orderId, event.itemType, event.itemName, event.timeIn);

        const delay = KitchenOrderInHandler.calculateDelay(event.itemType);
        const timeUp = DateHelper.addSeconds(DateHelper.UTCNow, delay);
        kitchenOrder.setTimeUp(event.itemLineId, timeUp);

        await this.repository.insert(kitchenOrder);
    }

    private static calculateDelay(itemType: ItemType) {
        switch (itemType) {
            case ItemType.CROISSANT:
                return 7
            case ItemType.CROISSANT_CHOCOLATE:
                return 7
            case ItemType.CAKEPOP:
                return 5
            case ItemType.MUFFIN:
                return 7
            default:
                return 3
        }
    }
}