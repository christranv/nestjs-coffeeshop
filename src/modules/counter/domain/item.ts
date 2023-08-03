import { Column, Entity, PrimaryColumn } from "typeorm";
import { ItemType } from "../../../shared/domain/base/enums/item-type";

@Entity()
export class Item {
    @PrimaryColumn('int')
    id: ItemType;

    @Column()
    name: string;

    @Column('float')
    price: number;

    constructor(type: ItemType, price: number) {
        this.id = type;
        this.name = ItemType[type];
        this.price = price;
    }
}