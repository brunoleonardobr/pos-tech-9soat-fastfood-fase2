import Order from "../../../domain/entities/order";
import { OrderStatus } from "../../../domain/enums/status.enum";
import OrdersNotFoundException from "../../exceptions/orders-not-found.exception";
import { OrderRepository } from "../../repositories/order-repository";
import UseCase from "../use-case";

export default class ProcessPayment implements UseCase {
  constructor(readonly orderRepository: OrderRepository) {}
  async execute(input: {
    orderId: string;
    statusPayment: string;
  }): Promise<any> {
    const order = await this.orderRepository.findById(input.orderId);
    if (!order) {
      throw new OrdersNotFoundException("Order not found.");
    }
    if (input.statusPayment === "paid") {
      order.setStatus(OrderStatus.RECEIVED);
      await this.orderRepository.updateStatus(order);
      return { success: true, message: "Payment successful." };
    } else {
      return { success: false, message: "Payment failed." };
    }
  }
}
