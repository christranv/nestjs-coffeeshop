import { ItemType } from '@src/shared/domain/base/enums/item-type';
import { DomainException } from '@src/shared/domain/exceptions/domain.exception';
import { BaseAggregateRoot } from '@src/shared/domain/seedwork/base-entity';
import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { PlaceOrderCommand } from './commands/place-order.command';
import { BaristaOrderIn, KitchenOrderIn } from './events/order-in';
import { OrderUp } from './events/order-up';
import { OrderUpdate } from './events/order-update';
import { Item } from './item';
import { ItemStatus } from './item-status';
import { LineItem } from './line-item';
import { Location } from './location';
import { OrderSource } from './order-source';
import { OrderStatus } from './order-status';

@Entity()
export class Order extends BaseAggregateRoot {
  @PrimaryColumn()
  public id: string;

  @Column('int')
  public orderSource: OrderSource;

  @Column()
  public loyaltyMemberId: string;

  @Column('int')
  public orderStatus: OrderStatus;

  @Column('int')
  public location: Location;

  @OneToMany(() => LineItem, (lineItem) => lineItem.order)
  public lineItems: Relation<LineItem[]>;

  constructor(orderSource: OrderSource, loyaltyMemberId: string, orderStatus: OrderStatus, location: Location) {
    super()
    this.orderSource = orderSource;
    this.loyaltyMemberId = loyaltyMemberId;
    this.orderStatus = orderStatus;
    this.location = location;
  }

  static from(command: PlaceOrderCommand, itemMap: Map<ItemType, Item>): Order {
    const order = new Order(command.orderSource, command.loyaltyMemberId, OrderStatus.IN_PROGRESS, command.location);

    if (command.baristaItems.length) {
      for (const baristaItem of command.baristaItems) {
        const item = itemMap.get(baristaItem.itemType);
        if (!item) throw new DomainException("Item not found!")
        const lineItem = new LineItem(baristaItem.itemType, item.name, item.price, ItemStatus.IN_PROGRESS, true);

        order.apply(new OrderUpdate(order.id, lineItem.id, lineItem.itemType, OrderStatus.IN_PROGRESS));
        order.apply(new BaristaOrderIn(order.id, lineItem.id, lineItem.itemType));

        order.lineItems.push(lineItem);
      }
    }

    if (command.kitchenItems.length) {
      for (const kitchenItem of command.kitchenItems) {
        const item = itemMap.get(kitchenItem.itemType);
        if (!item) throw new DomainException("Item not found!")
        const lineItem = new LineItem(kitchenItem.itemType, item.toString(), item.price, ItemStatus.IN_PROGRESS, false);

        order.addDomainEvent(new OrderUpdate(order.id, lineItem.id, lineItem.itemType, OrderStatus.IN_PROGRESS));
        order.addDomainEvent(new KitchenOrderIn(order.id, lineItem.id, lineItem.itemType));

        order.lineItems.push(lineItem);
      }
    }

    return order;
  }

  applyOrder(orderUp: OrderUp): Order {
    if (!this.lineItems)
      return this;

    const item = this.lineItems.find(i => i.id == orderUp.itemLineId);
    if (!!item) {
      item.itemStatus = ItemStatus.FULFILLED;
      this.apply(new OrderUpdate(this.id, item.id, item.itemType, OrderStatus.FULFILLED, orderUp.madeBy));
    }

    // if there are both barista and kitchen items is fulfilled then checking status and change order to Fulfilled
    if (this.lineItems.every(i => i.itemStatus == ItemStatus.FULFILLED)) {
      this.orderStatus = OrderStatus.FULFILLED;
    }
    return this;
  }
}
