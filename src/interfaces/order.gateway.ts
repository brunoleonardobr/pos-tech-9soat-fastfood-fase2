import Order from "../domain/entities/order";

export default interface IOrderGateway {
  create(input: Order): Promise<void>;
  list(): Promise<any>;
  findById(id: string): Promise<Order>;
  updateStatus(order: Order): Promise<void>;
}
