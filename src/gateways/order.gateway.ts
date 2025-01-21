import { OrderRepository } from "../application/repositories/order-repository";
import Order from "../domain/entities/order";

export default class OrderGateway {
  constructor(readonly orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async create(input: Order): Promise<void> {
    await this.orderRepository.create(input);
  }
  async list(): Promise<any> {
    return await this.orderRepository.list();
  }
  async findById(id: string): Promise<Order> {
    return await this.orderRepository.findById(id);
  }
  async updateStatus(order: Order): Promise<void> {
    await this.orderRepository.updateStatus(order);
  }
}
