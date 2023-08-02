import { ItemType } from "../../../../shared/domain/base/enums/item-type";
import { DateHelper } from "../../../../shared/domain/helpers/date-helper";
import { OrderUp } from "../../counter/events/order-up";
import { Item } from "../../item";
import { BaseAggregateRoot } from "../../seedwork/base-entity";

class KitchenOrder extends BaseAggregateRoot {
    readonly itemName: string;
    timeUp: Date;

    private constructor(
        readonly orderId: string,
        readonly itemType: ItemType,
        readonly timeIn: Date,
    ) {
        super();
        this.itemName = Item.GetItem(this.itemType).toString();
    }

    public SetTimeUp(itemLineId: string, timeUp: Date): KitchenOrder {
        this.addDomainEvent(new OrderUp(this.orderId, itemLineId, Item.GetItem(this.itemType).toString(), this.itemType, DateHelper.UTCNow, "chris"));
        this.timeUp = timeUp;
        return this;
    }

    static From(orderId: string, itemType: ItemType, timeIn: Date): KitchenOrder {
        return new KitchenOrder(orderId, itemType, timeIn);
    }
}
