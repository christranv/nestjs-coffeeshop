import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ItemType } from "@src/shared/domain/base/enums/item-type";
import { BaristaOrderIn } from "../../domain/events/order-in";

@EventsHandler(BaristaOrderIn)
export class BaristaOrderInHandler implements IEventHandler<BaristaOrderIn> {

    async handle(event: BaristaOrderIn): Promise<void> {
        // const itemName = Item.GetItem(event.itemType).toString();
        // var baristaItem = BaristaItem.from(event.itemType, itemName, DateHelper.UTCNow);

        // setTimeout()
        BaristaOrderInHandler.calculateDelay(event.itemType)
        // await Task.Delay(CalculateDelay(@event.ItemType), cancellationToken);

        // baristaItem.setTimeUp(@event.OrderId, @event.ItemLineId, DateTime.UtcNow);

        // await _baristaItemRepository.AddAsync(baristaItem, cancellationToken: cancellationToken);

        // await baristaItem.RelayAndPublishEvents(_publisher, cancellationToken);
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