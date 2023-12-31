import { ItemType } from '@src/shared/domain/base/enums/item-type';
import { OrderUp } from '@src/shared/domain/events/order-up';
import { IdHelper } from '@src/shared/domain/helpers/id.helper';
import { BaseAggregateRoot } from '@src/shared/domain/seedwork/base-entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BaristaItem extends BaseAggregateRoot {
  @PrimaryColumn("uuid")
  public id: string;

  @Column('int')
  public itemType: ItemType;

  @Column()
  public itemName: string;

  @Column()
  public timeIn: Date;

  @Column()
  public timeUp: Date;

  private constructor(itemType: ItemType, itemName: string, timeIn: Date) {
    super();
    this.id = IdHelper.GetNewUUID();
    this.itemType = itemType;
    this.itemName = itemName;
    this.timeIn = timeIn;
  }

  public static from(
    itemType: ItemType,
    itemName: string,
    timeIn: Date,
  ): BaristaItem {
    return new BaristaItem(itemType, itemName, timeIn);
  }

  public setTimeUp(
    orderId: string,
    itemLineId: string,
    timeUp: Date
  ): BaristaItem {
    this.addDomainEvent(
      new OrderUp(
        orderId,
        itemLineId,
        this.itemName,
        this.itemType,
        timeUp,
        'chris',
      ),
    );
    this.timeUp = timeUp;
    return this;
  }
}
