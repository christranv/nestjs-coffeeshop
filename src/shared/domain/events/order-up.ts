import { ItemType } from "@src/shared/domain/base/enums/item-type";
import { DateHelper } from "@src/shared/domain/helpers/date-helper";
import { BaseDomainEvent } from "@src/shared/domain/seedwork/base-domain-event";

export class OrderUp extends BaseDomainEvent {
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