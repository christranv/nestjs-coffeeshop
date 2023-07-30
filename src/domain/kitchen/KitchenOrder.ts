import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class KitchenOrder {
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

  private constructor(id: string, itemType: ItemType, timeIn: Date) {
    this.id = id;
    this.itemType = itemType;
    this.itemName = itemType.toString();
    this.timeIn = timeIn;
  }
}
