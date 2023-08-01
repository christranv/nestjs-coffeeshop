import { ItemType } from "@/src/domain/base/enums/item-type";
import { DateHelper } from "../../base/helpers/date-helper";

export class BaristaOrderUp {

  constructor(
    public readonly orderId: string,
    public readonly itemLineId: string,
    public readonly name: string,
    public readonly itemType: ItemType,
    public readonly timeIn: Date,
    public readonly timeUp: Date,
    public readonly madeBy: string,
  ) {
    this.timeIn = DateHelper.UTCNow;
  }
}
