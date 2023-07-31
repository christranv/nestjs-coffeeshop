import { DateTimeHelper } from "src/domain/base/helpers/datetime-helper";
import { BaseEvent } from "src/domain/seedwork/BaseEvent";

export class OrderUp extends BaseEvent {
    orderId: string;
    itemLineId: string;
    name: string;
    itemType: ItemType
    timeIn: Date
    madeBy: string
    timeUp: Date

    constructor(orderId: string, itemLineId: string, name: string, itemType: ItemType, timeUp: Date, madeBy: string) {
        super()
        this.orderId = orderId;
        this.itemLineId = itemLineId;
        this.name = name;
        this.itemType = itemType;
        this.timeIn = DateTimeHelper.UTCNow;
        this.madeBy = madeBy;
        this.timeUp = timeUp;
    }
}

class BaristaOrderUp extends OrderUp {
    constructor(orderId: string, itemLineId: string, name: string, itemType: ItemType, timeUp: Date, madeBy: string) {
        super(orderId, itemLineId, name, itemType, timeUp, madeBy)
    }
}

class KitchenOrderUp extends OrderUp {
    constructor(orderId: string, itemLineId: string, name: string, itemType: ItemType, timeUp: Date, madeBy: string) {
        super(orderId, itemLineId, name, itemType, timeUp, madeBy)
    }
}
