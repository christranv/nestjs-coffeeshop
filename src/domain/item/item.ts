import { ItemType } from "../base/enums/item-type";

export class Item {
    price: number;
    type: ItemType;

    constructor(price: number, type: ItemType) {
        this.price = price;
        this.type = type;
    }

    public static GetItem(type: ItemType): Item {
        switch (type) {
            case ItemType.CAPPUCCINO:
                return new Item(4.5, ItemType.CAPPUCCINO)
            case ItemType.COFFEE_BLACK:
                return new Item(3, ItemType.COFFEE_BLACK)
            case ItemType.COFFEE_WITH_ROOM:
                return new Item(3, ItemType.COFFEE_WITH_ROOM)
            case ItemType.ESPRESSO:
                return new Item(4.5, ItemType.ESPRESSO)
            case ItemType.ESPRESSO_DOUBLE:
                return new Item(2, ItemType.ESPRESSO_DOUBLE)
            case ItemType.LATTE:
                return new Item(5, ItemType.LATTE)
            case ItemType.CAKEPOP:
                return new Item(4, ItemType.CAKEPOP)
            case ItemType.CROISSANT:
                return new Item(6, ItemType.CROISSANT)
            case ItemType.MUFFIN:
                return new Item(4.9, ItemType.MUFFIN)
            case ItemType.CROISSANT_CHOCOLATE:
                return new Item(8, ItemType.CROISSANT_CHOCOLATE)
            default:
                return new Item(7, ItemType.CAPPUCCINO)
                break;
        }
    }

    toString(): string {
        return `${this.type}-${this.price}`;
    }
}