import OrderItemGateway from "../../../gateways/order-item.gateway";
import OrderGateway from "../../../gateways/order.gateway";
import OrdersNotFoundException from "../../exceptions/orders-not-found.exception";
import UseCase from "../use-case";

export default class ListOrders implements UseCase {
  constructor(
    readonly orderGateway: OrderGateway,
    readonly orderItemGateway: OrderItemGateway
  ) {}

  async execute(): Promise<any> {
    const orders = await this.orderGateway.list();
    if (!orders.length) throw new OrdersNotFoundException();
    for (const order of orders) {
      order.items = await this.orderItemGateway.getByOrderId(order.id);
    }
    return orders;
  }
}
