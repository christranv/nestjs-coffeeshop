import { ItemType } from "src/domain/base/enums/ItemType";
import { DateHelper } from "src/domain/base/helpers/date-helper";
import { BaseEvent } from "src/domain/seedwork/BaseEvent";

export class OrderIn extends BaseEvent {
    orderId: string;
    itemLineId: string;
    itemType: ItemType;
    timeIn: Date;

    constructor(orderId: string, itemLineId: string, itemType: ItemType) {
        super();
        this.orderId = orderId;
        this.itemLineId = itemLineId;
        this.itemType = itemType;
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
