import OrdersNotFoundException from "../../exceptions/orders-not-found.exception";
import OrderItemRepository from "../../repositories/order-item-repository";
import { OrderRepository } from "../../repositories/order-repository";
import UseCase from "../use-case";

export default class ListOrders implements UseCase {
  constructor(
    readonly orderRepository: OrderRepository,
    readonly orderItemRepository: OrderItemRepository
  ) {}

  async execute(): Promise<any> {
    const orders = await this.orderRepository.list();
    if (!orders.length) throw new OrdersNotFoundException();
    for (const order of orders) {
      order.items = await this.orderItemRepository.getByOrderId(order.id);
    }
    return orders;
  }
}
