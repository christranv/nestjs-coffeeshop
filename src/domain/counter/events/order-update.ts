import { ItemType } from "../../base/enums/item-type";
import { DateHelper } from "../../base/helpers/date-helper";
import { BaseEvent } from "../../seedwork/base-event";

class OrderUpdate extends BaseEvent {
    timeIn: Date;

    constructor(
        readonly orderId: string,
        readonly itemLineId: string,
        readonly itemType: ItemType) {
        super();
        this.timeIn = DateHelper.UTCNow
    }
}