import { BaseEvent } from "../../seedwork/base-event";
import { DateHelper } from "../../base/helpers/date-helper";
import { ItemType } from "../../base/enums/item-type";

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

class BaristaOrderIn extends OrderIn {
    constructor(orderId: string, itemLineId: string, itemType: ItemType) {
        super(orderId, itemLineId, itemType)
    }
}

class KitchenOrderIn extends OrderIn {
    constructor(orderId: string, itemLineId: string, itemType: ItemType) {
        super(orderId, itemLineId, itemType);
    }
}
