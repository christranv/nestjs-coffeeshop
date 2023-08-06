import { CommandType } from "@src/modules/counter/domain/enums";
import { ItemType } from "@src/shared/domain/base/enums/item-type";
import { Location } from "../location";
import { OrderSource } from "../order-source";

export class CommandItem {
    readonly itemType: ItemType
}

export class PlaceOrderCommand {
    readonly commandType: CommandType;
    readonly orderSource: OrderSource;
    readonly location: Location;
    readonly loyaltyMemberId: string;
    readonly baristaItems: CommandItem[];
    readonly kitchenItems: CommandItem[];
    createdBy: string;

    constructor(
        commandType: CommandType = CommandType.PLACE_ORDER,
        orderSource: OrderSource,
        location: Location,
        loyaltyMemberId: string,
        baristaItems: CommandItem[],
        kitchenItems: CommandItem[],
    ) {
        this.commandType = commandType;
        this.orderSource = orderSource;
        this.location = location;
        this.loyaltyMemberId = loyaltyMemberId;
        this.baristaItems = baristaItems;
        this.kitchenItems = kitchenItems;
    }
}
