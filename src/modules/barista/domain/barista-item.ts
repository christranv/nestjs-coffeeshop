import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ItemType } from '../../../../shared/domain/base/enums/item-type';
import { DateHelper } from '../../../../shared/domain/helpers/date-helper';
import { BaseAggregateRoot } from '../seedwork/base-entity';
import { BaristaOrderUp } from './events/barista-order-up';

@Entity()
export class BaristaItem extends BaseAggregateRoot {
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

  private constructor(itemType: ItemType, itemName: string, timeIn: Date) {
    super();
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
    timeUp: Date,
  ): BaristaItem {
    this.addDomainEvent(
      new BaristaOrderUp(
        orderId,
        itemLineId,
        this.itemName,
        this.itemType,
        DateHelper.UTCNow,
        timeUp,
        'teesee',
      ),
    );
    this.timeUp = timeUp;
    return this;
  }
}
