import { ItemType } from "../../base/enums/item-type";
import { DateHelper } from "../../base/helpers/date-helper";
import { OrderUp } from "../../counter/events/order-up";
import { Item } from "../../item/item";

class KitchenOrder {
    readonly timeUp: Date;

    private constructor(
        readonly orderId: string,
        readonly itemType: ItemType,
        readonly itemName: string,
        readonly timeIn: Date,
    ) {
        this.timeIn = DateHelper.UTCNow;
    }

    public SetTimeUp(Guid itemLineId, DateTime timeUp): KitchenOrder {
        AddDomainEvent(new OrderUp(OrderId, itemLineId, Item.GetItem(ItemType)?.ToString()!, ItemType, DateTime.UtcNow, "teesee"));
        TimeUp = timeUp;
        return this;
    }

    static From(Guid orderId, ItemType itemType, DateTime timeIn): KitchenOrder {
        return new KitchenOrder(orderId, itemType, timeIn);
    }
}
