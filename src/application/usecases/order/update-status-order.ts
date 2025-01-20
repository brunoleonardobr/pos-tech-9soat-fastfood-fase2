import { OrderStatus } from "../../../domain/enums/status.enum";
import OrdersNotFoundException from "../../exceptions/orders-not-found.exception";
import { OrderRepository } from "../../repositories/order-repository";
import UseCase from "../use-case";

export default class UpdateStatusOrder implements UseCase {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(input: UpdateStatusOrderInput): Promise<void> {
    const order = await this.orderRepository.findById(input.id);
    if (!order) {
      throw new OrdersNotFoundException("Order not found");
    }
    order.setStatus(input.status);
    await this.orderRepository.updateStatus(order);
  }
}
export type UpdateStatusOrderInput = {
  id: string;
  status: OrderStatus;
};
