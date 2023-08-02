import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { BaristaItem } from "@src/modules/barista/domain/barista-item";
import { DateHelper } from "@src/shared/domain/helpers/date-helper";
import { BaristaOrderIn } from "../../domain/events/order-in";
import { Item } from "../../domain/item";

@EventsHandler(BaristaOrderIn)
export class BaristaOrderInHandler implements IEventHandler<BaristaOrderIn> {
    constructor() { }

    handle(event: BaristaOrderIn) {
        const itemName = Item.GetItem(event.itemType).toString();
        var baristaItem = BaristaItem.from(event.itemType, itemName, DateHelper.UTCNow);

        // setTimeout()
        // await Task.Delay(CalculateDelay(@event.ItemType), cancellationToken);

        // baristaItem.setTimeUp(@event.OrderId, @event.ItemLineId, DateTime.UtcNow);

        // await _baristaItemRepository.AddAsync(baristaItem, cancellationToken: cancellationToken);

        // await baristaItem.RelayAndPublishEvents(_publisher, cancellationToken);
    }

    // private static CalculateDelay(ItemType itemType) {
    //     switch (itemType) {
    //         case ItemType.COFFEE_BLACK:
    //             return 5
    //         case ItemType.COFFEE_WITH_ROOM:
    //             return 5
    //         case ItemType.ESPRESSO:
    //             return 7
    //         case ItemType.ESPRESSO_DOUBLE:
    //             return 7
    //         case ItemType.CAPPUCCINO:
    //             return 10
    //         default:
    //             return 3
    //     };
    // }
}