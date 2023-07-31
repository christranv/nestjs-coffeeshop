import { ItemType } from "../../base/enums/ItemType";
import { DateHelper } from "../../base/helpers/date-helper";
import { BaseEvent } from "../../seedwork/BaseEvent";

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
        this.timeIn = DateHelper.UTCNow;
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
