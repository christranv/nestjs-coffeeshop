import { CommandType } from "@src/modules/counter/domain/enums";
import { ItemType } from "@src/shared/domain/base/enums/item-type";
import { DateHelper } from "@src/shared/domain/helpers/date-helper";
import { OrderSource } from "../order-source";

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
