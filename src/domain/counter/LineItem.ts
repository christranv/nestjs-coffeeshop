import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { ItemType } from '../base/enums/ItemType';
import { ItemStatus } from './ItemStatus';
import { Order } from './Order';

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
