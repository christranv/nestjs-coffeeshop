import { Entity, PrimaryColumn, Column } from 'typeorm';
import { LineItem } from './LineItem';
import { Location } from './Location';

@Entity()
export class Order {
  @PrimaryColumn()
  public id: string;

  @Column()
  public orderSource: OrderSource;

  @Column()
  public loyaltyMemberId: string;

  @Column()
  public orderStatus: OrderStatus;

  @Column()
  public location: Location;

  @Column()
  public lineItems: LineItem[];
}
