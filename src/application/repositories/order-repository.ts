import Order from "../../domain/entities/order";

export interface OrderRepository {
  create(input: Order): Promise<void>;
  list(): Promise<any>;
}
