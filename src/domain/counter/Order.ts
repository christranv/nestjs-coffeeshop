import { Entity, PrimaryColumn, Column } from 'typeorm';
import { LineItem } from './LineItem';
import { Location } from './Location';
import { OrderUp } from './events/OrderUp';

@Entity()
export class Order {
  @PrimaryColumn()
  public id: string;

  @Column()
  public orderSource: OrderSource;

  @Column()
  public loyaltyMemberId: string;

  @Column()
  public orderStatus: OrderStatus;

  @Column()
  public location: Location;

  @Column()
  public lineItems: LineItem[];

  private Order(orderSource: OrderSource, loyaltyMemberId: string, orderStatus: OrderStatus, location: Location) {
    this.orderSource = orderSource;
    this.loyaltyMemberId = loyaltyMemberId;
    this.orderStatus = orderStatus;
    this.location = location;
  }

  // static async From(PlaceOrderCommand placeOrderCommand, IItemGateway itemGateway): Order {
  //   var order = new Order(placeOrderCommand.OrderSource, placeOrderCommand.LoyaltyMemberId, OrderStatus.IN_PROGRESS, placeOrderCommand.Location);

  //   if (placeOrderCommand.BaristaItems.Any()) {
  //     var itemTypes = placeOrderCommand.BaristaItems.Select(x => x.ItemType);
  //     var items = await itemGateway.GetItemsByType(itemTypes.ToArray());
  //     foreach(var baristaItem in placeOrderCommand.BaristaItems)
  //     {
  //       var item = items.FirstOrDefault(x => x.Type == baristaItem.ItemType);
  //       var lineItem = new LineItem(baristaItem.ItemType, item?.Type.ToString()!, (decimal)item?.Price!, ItemStatus.IN_PROGRESS, true);

  //       order.AddDomainEvent(new OrderUpdate(order.Id, lineItem.Id, lineItem.ItemType, OrderStatus.IN_PROGRESS));
  //       order.AddDomainEvent(new BaristaOrderIn(order.Id, lineItem.Id, lineItem.ItemType));

  //       order.LineItems.Add(lineItem);
  //     }
  //   }

  //   if (placeOrderCommand.KitchenItems.Any()) {
  //     var itemTypes = placeOrderCommand.KitchenItems.Select(x => x.ItemType);
  //     var items = await itemGateway.GetItemsByType(itemTypes.ToArray());
  //     for (let kitchenItem of placeOrderCommand.KitchenItems) {
  //       var item = items.FirstOrDefault(x => x.Type == kitchenItem.ItemType);
  //       var lineItem = new LineItem(kitchenItem.ItemType, item?.Type.ToString()!, (decimal)item?.Price!, ItemStatus.IN_PROGRESS, false);

  //       // order.AddDomainEvent(new OrderUpdate(order.Id, lineItem.Id, lineItem.ItemType, OrderStatus.IN_PROGRESS));
  //       // order.AddDomainEvent(new KitchenOrderIn(order.Id, lineItem.Id, lineItem.ItemType));

  //       order.lineItems.push(lineItem);
  //     }
  //   }

  //   return order;
  // }

  Apply(orderUp: OrderUp): Order {
    if (!this.lineItems)
      return this;

    const item = this.lineItems.find(i => i.id == orderUp.itemLineId);
    if (!!item) {
      item.itemStatus = ItemStatus.FULFILLED;
      // AddDomainEvent(new OrderUpdate(Id, item.Id, item.ItemType, OrderStatus.FULFILLED, orderUp.MadeBy));
    }

    // if there are both barista and kitchen items is fulfilled then checking status and change order to Fulfilled
    if (this.lineItems.every(i => i.itemStatus == ItemStatus.FULFILLED)) {
      this.orderStatus = OrderStatus.FULFILLED;
    }
    return this;
  }
}
