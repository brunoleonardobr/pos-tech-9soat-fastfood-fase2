import { OrderRepository } from "../application/repositories/order-repository";
import Order from "../domain/entities/order";

export default class PaymentGateway {
  constructor(readonly orderRepository: OrderRepository) {}
  async findById(orderId: string) {
    return await this.orderRepository.findById(orderId);
  }
  async updateStatus(order: Order) {
    return await this.orderRepository.updateStatus(order);
  }
}
