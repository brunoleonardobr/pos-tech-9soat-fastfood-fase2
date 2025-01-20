import OrdersNotFoundException from "../../exceptions/orders-not-found.exception";
import { OrderRepository } from "../../repositories/order-repository";
import UseCase from "../use-case";

export default class GetStatusOrder implements UseCase {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<any> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new OrdersNotFoundException();
    return {
      id: order.id,
      status: order.getStatus(),
    };
  }
}
