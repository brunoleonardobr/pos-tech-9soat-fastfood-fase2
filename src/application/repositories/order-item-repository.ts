import OrderItem from "../../domain/entities/order-item";

export default interface OrderItemRepository {
  create(orderItem: OrderItem): Promise<void>;
  getByOrderId(orderId: string): Promise<OrderItem[]>;
}
