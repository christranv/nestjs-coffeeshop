import { ItemType } from "src/domain/base/enums/ItemType";
import { DateHelper } from "../../base/helpers/date-helper";

export class BaristaOrderUp {
  orderId: string;
  itemLineId: string;
  name: string;
  itemType: ItemType;
  timeIn: Date;
  madeBy: string;
  timeUp: Date;

  constructor(
    orderId: string,
    itemLineId: string,
    name: string,
    itemType: ItemType,
    timeUp: Date,
    madeBy: string,
  ) {
    this.orderId = orderId;
    this.itemLineId = itemLineId;
    this.name = name;
    this.itemType = itemType;
    this.timeIn = DateHelper.UTCNow;
    this.madeBy = madeBy;
    this.timeUp = timeUp;
  }
}
