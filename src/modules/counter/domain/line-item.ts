import { ItemType } from '@src/shared/domain/base/enums/item-type';
import { IdHelper } from '@src/shared/domain/helpers/id.helper';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { ItemStatus } from './item-status';
import { Order } from './order';

@Entity()
export class LineItem {
  @PrimaryColumn("uuid")
  public id: string;

  @Column('int')
  public itemType: ItemType;

  @Column()
  public name: string;

  @Column('float')
  public price: number;

  @Column('int')
  public itemStatus: ItemStatus;

  @Column()
  public isBaristaOrder: boolean;

  @ManyToOne(() => Order, (order) => order.lineItems)
  @JoinColumn()
  order: Relation<Order>;

  constructor(itemType: ItemType, name: string, price: number, itemStatus: ItemStatus, isBaristaOrder: boolean) {
    this.id = IdHelper.GetNewUUID();
    this.itemType = itemType;
    this.name = name;
    this.price = price;
    this.itemStatus = itemStatus;
    this.isBaristaOrder = isBaristaOrder;
  }
}
