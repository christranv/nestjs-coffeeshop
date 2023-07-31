import { ItemType } from "src/domain/base/enums/ItemType";
import { DateHelper } from "../../base/helpers/date-helper";
import { BaseEvent } from "src/domain/seedwork/BaseEvent";

class OrderUpdate extends BaseEvent {
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