import { OrderUp } from '@src/modules/counter/domain/events/order-up';
import { Item } from '@src/modules/counter/domain/item';
import { ItemType } from '@src/shared/domain/base/enums/item-type';
import { DateHelper } from '@src/shared/domain/helpers/date-helper';
import { BaseAggregateRoot } from '@src/shared/domain/seedwork/base-entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class KitchenOrder extends BaseAggregateRoot {
  @PrimaryColumn()
  public id: string;

  @Column('int')
  public itemType: ItemType;

  @Column()
  public itemName: string;

  @Column()
  public timeIn: Date;

  @Column()
  public timeUp: Date;

  private constructor(id: string, itemType: ItemType, timeIn: Date) {
    super()
    this.id = id;
    this.itemType = itemType;
    this.itemName = Item.GetItem(itemType).toString();
    this.timeIn = timeIn;
  }

  setTimeUp(itemLineId: string, timeUp: Date): KitchenOrder {
    this.addDomainEvent(new OrderUp(this.id, itemLineId, Item.GetItem(this.itemType).toString(), this.itemType, DateHelper.UTCNow, "chris"));
    this.timeUp = timeUp;
    return this;
  }

  static from(orderId: string, itemType: ItemType, timeIn: Date): KitchenOrder {
    return new KitchenOrder(orderId, itemType, timeIn);
  }
}
