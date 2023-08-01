import { ItemType } from "@/src/domain/base/enums/item-type";
import { DateHelper } from "@/src/domain/base/helpers/date-helper";
import { OrderSource } from "@/src/domain/counter/order-source";
import { CommandType } from "../../../application/enums";

class CommandItem {
    readonly itemType: ItemType
}

export class PlaceOrderCommand {
    readonly timeStamp: Date;

    constructor(
        readonly commandType: CommandType = CommandType.PLACE_ORDER,
        readonly orderSource: OrderSource,
        readonly location: Location,
        readonly loyaltyMemberId: string,
        readonly baristaItems: CommandItem[],
        readonly kitchenItems: CommandItem[],
    ) {
        this.timeStamp = DateHelper.UTCNow
    }
}
