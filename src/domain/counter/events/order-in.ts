import { ItemType } from "../../base/enums/item-type";
import { DateHelper } from "../../base/helpers/date-helper";
import { BaseEvent } from "../../seedwork/base-event";

export class OrderIn extends BaseEvent {
    readonly timeIn: Date

    constructor(
        readonly orderId: string,
        readonly itemLineId: string,
        readonly itemType: ItemType,
    ) {
        super();
        this.timeIn = DateHelper.UTCNow
    }
}

export class BaristaOrderIn extends OrderIn {
    constructor(orderId: string, itemLineId: string, itemType: ItemType) {
        super(orderId, itemLineId, itemType)
    }
}

export class KitchenOrderIn extends OrderIn {
    constructor(orderId: string, itemLineId: string, itemType: ItemType) {
        super(orderId, itemLineId, itemType);
    }
}
