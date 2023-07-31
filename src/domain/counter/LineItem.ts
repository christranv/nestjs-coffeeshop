import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ItemType } from '../base/enums/ItemType';
import { ItemStatus } from './ItemStatus';

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
