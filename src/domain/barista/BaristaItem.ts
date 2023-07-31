import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class BaristaItem {
  @PrimaryColumn()
  public id: string;

  @Column()
  public itemType: ItemType;

  @Column()
  public itemName: string;

  @Column()
  public timeIn: Date;

  @Column()
  public timeUp: Date;

  private constructor(itemType: ItemType, itemName: string, timeIn: Date) {
    this.itemType = itemType;
    this.itemName = itemName;
    this.timeIn = timeIn;
  }

  public static From(
    itemType: ItemType,
    itemName: string,
    timeIn: Date,
  ): BaristaItem {
    return new BaristaItem(itemType, itemName, timeIn);
  }

  public SetTimeUp(
    orderId: string,
    itemLineId: string,
    timeUp: Date,
  ): BaristaItem {
    // AddDomainEvent(
    //   new BaristaOrderUp(
    //     orderId,
    //     itemLineId,
    //     this.itemName,
    //     this.itemType,
    //     DateTimeHelper.UTCNow,
    //     'teesee',
    //   ),
    // );
    this.timeUp = timeUp;
    return this;
  }
}
