import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ItemType } from '../base/enums/ItemType';

@Entity()
export class KitchenOrder {
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
    this.id = id;
    this.itemType = itemType;
    this.itemName = ItemType[itemType];
    this.timeIn = timeIn;
  }
}
