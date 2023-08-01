import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { ItemType } from '../base/enums/item-type';
import { ItemStatus } from './item-status';
import { Order } from './order';

@Entity()
export class LineItem {
  @PrimaryColumn()
  public id: string;

  @Column('int')
  public itemType: ItemType;

  @Column()
  public name: string;

  @Column()
  public price: number;

  @Column('int')
  public itemStatus: ItemStatus;

  @Column()
  public isBaristaOrder: boolean;

  @ManyToOne(() => Order, _ => _.lineItems)
  order: Order;
}
