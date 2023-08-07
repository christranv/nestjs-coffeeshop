import { EventPublisher, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemType } from "@src/shared/domain/base/enums/item-type";
import { KitchenOrderIn } from "@src/shared/domain/events/order-in";
import { DateHelper } from "@src/shared/domain/helpers/date.helper";
import { Repository } from "typeorm";
import { KitchenOrder } from "../../domain/kitchen-order";

@EventsHandler(KitchenOrderIn)
export class KitchenOrderInHandler implements IEventHandler<KitchenOrderIn> {

    constructor(
        private readonly publisher: EventPublisher,
        @InjectRepository(KitchenOrder)
        private readonly repository: Repository<KitchenOrder>
    ) { }

    async handle(event: KitchenOrderIn): Promise<void> {
        const kitchenOrder = this.publisher.mergeObjectContext(
            KitchenOrder.from(event.orderId, event.itemType, event.itemName, event.timeIn)
        )

        const delay = KitchenOrderInHandler.calculateDelay(event.itemType);
        const timeUp = DateHelper.addSeconds(DateHelper.UTCNow, delay);
        kitchenOrder.setTimeUp(event.itemLineId, timeUp);

        await this.repository.save(kitchenOrder);
        kitchenOrder.commit();
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