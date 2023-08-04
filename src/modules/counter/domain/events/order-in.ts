import { ItemType } from "@src/shared/domain/base/enums/item-type";
import { DateHelper } from "@src/shared/domain/helpers/date-helper";
import { BaseEvent } from "@src/shared/domain/seedwork/base-event";

export class OrderIn extends BaseEvent {
    readonly timeIn: Date

    constructor(
        readonly orderId: string,
        readonly itemLineId: string,
        readonly itemType: ItemType,
        readonly itemName: string,
    ) {
        super();
        this.timeIn = DateHelper.UTCNow
    }
}

export class BaristaOrderIn extends OrderIn {
    constructor(orderId: string, itemLineId: string, itemType: ItemType, itemName: string) {
        super(orderId, itemLineId, itemType, itemName)
    }
}

export class KitchenOrderIn extends OrderIn {
    constructor(orderId: string, itemLineId: string, itemType: ItemType, itemName: string) {
        super(orderId, itemLineId, itemType, itemName);
    }
}
