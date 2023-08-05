import { EventsHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCommandHandler } from "@src/shared/application/seedwork/base.handler";
import { ItemType } from "@src/shared/domain/base/enums/item-type";
import { KitchenOrderIn } from "@src/shared/domain/events/order-in";
import { DateHelper } from "@src/shared/domain/helpers/date-helper";
import { DataSource, Repository } from "typeorm";
import { KitchenOrder } from "../../domain/kitchen-order";

@EventsHandler(KitchenOrderIn)
export class KitchenOrderInHandler extends BaseCommandHandler<KitchenOrderIn> {

    constructor(
        dataSource: DataSource,
        @InjectRepository(KitchenOrder)
        private readonly repository: Repository<KitchenOrder>
    ) {
        super(dataSource);
    }

    async onExecute(event: KitchenOrderIn): Promise<void> {
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