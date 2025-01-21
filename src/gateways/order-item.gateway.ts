import OrderItemRepository from "../application/repositories/order-item-repository";
import OrderItem from "../domain/entities/order-item";

export default class OrderItemGateway {
  constructor(readonly orderItemRepository: OrderItemRepository) {}
  async create(orderItem: OrderItem): Promise<void> {
    await this.orderItemRepository.create(orderItem);
  }
  async getByOrderId(orderId: string): Promise<OrderItem[]> {
    return await this.orderItemRepository.getByOrderId(orderId);
  }
}
