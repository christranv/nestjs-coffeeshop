import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class LineItem {
  @PrimaryColumn()
  public id: string;

  @Column()
  public itemType: ItemType;

  @Column()
  public name: string;

  @Column()
  public price: number;

  @Column()
  public itemStatus: ItemStatus;

  @Column()
  public isBaristaOrder: boolean;
}
