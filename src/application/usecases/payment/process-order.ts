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
      throw new Error("Order not found.");
    }
    order.status = input.statusPayment;
    await this.orderRepository.updateStatus(order);
    if (input.statusPayment === "paid") {
      return { success: true, message: "Payment successful." };
    } else {
      return { success: false, message: "Payment failed." };
    }
  }
}
