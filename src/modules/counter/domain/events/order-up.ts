import { ItemType } from "../../../../../shared/domain/base/enums/item-type";
import { DateHelper } from "../../../../../shared/domain/helpers/date-helper";
import { BaseEvent } from "../../seedwork/base-event";

export class OrderUp extends BaseEvent {
    readonly timeIn: Date

    constructor(
        readonly orderId: string,
        readonly itemLineId: string,
        readonly name: string,
        readonly itemType: ItemType,
        readonly timeUp: Date,
        readonly madeBy: string,
    ) {
        super()
        this.timeIn = DateHelper.UTCNow;
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
