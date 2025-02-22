import Order from "../../domain/entities/order";

export interface OrderRepository {
  create(input: Order): Promise<void>;
  list(): Promise<any>;
  findById(id: string): Promise<Order>;
  updateStatus(order: Order): Promise<void>;
}
