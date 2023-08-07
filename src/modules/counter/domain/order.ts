import { ItemType } from '@src/shared/domain/base/enums/item-type';
import { BaristaOrderIn, KitchenOrderIn } from '@src/shared/domain/events/order-in';
import { DomainException } from '@src/shared/domain/exceptions/domain.exception';
import { IdHelper } from '@src/shared/domain/helpers/id.helper';
import { BaseAggregateRoot } from '@src/shared/domain/seedwork/base-entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderUp } from '../../../shared/domain/events/order-up';
import { PlaceOrderCommand } from './commands/place-order.command';
import { OrderUpdate } from './events/order-update';
import { Item } from './item';
import { ItemStatus } from './item-status';
import { LineItem } from './line-item';
import { Location } from './location';
import { OrderSource } from './order-source';
import { OrderStatus } from './order-status';

@Entity()
export class Order extends BaseAggregateRoot {
  @PrimaryColumn("uuid")
  public id: string;

  @Column('int')
  public orderSource: OrderSource;

  @Column()
  public loyaltyMemberId: string;

  @Column('int')
  public orderStatus: OrderStatus;

  @Column('int')
  public location: Location;

  @OneToMany(() => LineItem, (lineItem) => lineItem.order, {
    eager: true,
    cascade: ["insert", "update"],
  })
  public lineItems: LineItem[];

  @Column()
  public createdBy: string;

  constructor(orderSource: OrderSource, loyaltyMemberId: string, orderStatus: OrderStatus, location: Location, createdBy: string) {
    super()
    this.id = IdHelper.GetNewUUID();
    this.orderSource = orderSource;
    this.loyaltyMemberId = loyaltyMemberId;
    this.orderStatus = orderStatus;
    this.location = location;
    this.createdBy = createdBy;
  }

  static from(command: PlaceOrderCommand, itemMap: Map<ItemType, Item>): Order {
    const order = new Order(command.orderSource, command.loyaltyMemberId, OrderStatus.IN_PROGRESS, command.location, command.createdBy);
    order.lineItems = []

    if (command.baristaItems.length) {
      for (const baristaItem of command.baristaItems) {
        const item = itemMap.get(baristaItem.itemType);
        if (!item) throw new DomainException("Item not found!")
        const lineItem = new LineItem(baristaItem.itemType, item.name, item.price, ItemStatus.IN_PROGRESS, true);

        order.publish(new OrderUpdate(order.id, lineItem.id, lineItem.itemType, OrderStatus.IN_PROGRESS));
        order.addDomainEvent(new BaristaOrderIn(order.id, lineItem.id, lineItem.itemType, lineItem.name));

        order.lineItems.push(lineItem);
      }
    }

    if (command.kitchenItems.length) {
      for (const kitchenItem of command.kitchenItems) {
        const item = itemMap.get(kitchenItem.itemType);
        if (!item) throw new DomainException("Item not found!")
        const lineItem = new LineItem(kitchenItem.itemType, item.name, item.price, ItemStatus.IN_PROGRESS, false);

        order.addDomainEvent(new OrderUpdate(order.id, lineItem.id, lineItem.itemType, OrderStatus.IN_PROGRESS));
        order.addDomainEvent(new KitchenOrderIn(order.id, lineItem.id, lineItem.itemType, lineItem.name));

        order.lineItems.push(lineItem);
      }
    }

    return order;
  }

  applyOrder(orderUp: OrderUp) {
    if (!this.lineItems)
      return this;

    const item = this.lineItems.find(i => i.id == orderUp.itemLineId);
    if (!!item) {
      item.itemStatus = ItemStatus.FULFILLED;
      this.addDomainEvent(new OrderUpdate(this.id, item.id, item.itemType, OrderStatus.FULFILLED));
    }

    // if there are both barista and kitchen items is fulfilled then checking status and change order to Fulfilled
    if (this.lineItems.every(i => i.itemStatus == ItemStatus.FULFILLED)) {
      this.orderStatus = OrderStatus.FULFILLED;
    }
  }
}
