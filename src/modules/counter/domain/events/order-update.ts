import { ItemType } from "@src/shared/domain/base/enums/item-type";
import { DateHelper } from "@src/shared/domain/helpers/date-helper";
import { BaseDomainEvent } from "@src/shared/domain/seedwork/base-domain-event";
import { OrderStatus } from "../order-status";

export class OrderUpdate extends BaseDomainEvent {
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