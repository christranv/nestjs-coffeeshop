import { ItemType } from "@src/shared/domain/base/enums/item-type";
import { DateHelper } from "@src/shared/domain/helpers/date-helper";
import { BaseEvent } from "@src/shared/domain/seedwork/base-event";

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
