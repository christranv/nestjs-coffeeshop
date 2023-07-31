import { DateTimeHelper } from "src/domain/base/helpers/datetime-helper";

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
    this.timeIn = DateTimeHelper.UTCNow;
    this.madeBy = madeBy;
    this.timeUp = timeUp;
  }
}
