import { ItemType } from "../../base/enums/item-type";
import { DateHelper } from "../../base/helpers/date-helper";
import { BaseEvent } from "../../seedwork/base-event";
import { OrderStatus } from "../order-status";

export class OrderUpdate extends BaseEvent {
    readonly timeIn: Date;

    constructor(
        readonly orderId: string,
        readonly itemLineId: string,
        readonly itemType: ItemType,
        readonly orderStatus: OrderStatus,
        readonly madeBy?: string
    ) {
        super();
        this.timeIn = DateHelper.UTCNow;
    }
}