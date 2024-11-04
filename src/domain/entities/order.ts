import OrderItem from "./order-item";
import crypto from "crypto";
import { Product } from "./product";

export const OrderStatus = {
  RECEIVED: "received",
  IN_PROGRESS: "in_progress",
  READY: "ready",
  FINISHED: "finished",
};

export default class Order {
  private total: number;
  private status: string;
  readonly items: OrderItem[] = [];
  constructor(readonly id: string, readonly clientId: string) {
    this.total = this.calculateTotal();
    this.status = "open";
  }
  static create(clientId: string): Order {
    const id = crypto.randomUUID();
    return new Order(id, clientId);
  }
  addItem(product: Product, quantity: number) {
    const item = OrderItem.create(product.id, this.id, quantity, product.price);
    this.items.push(item);
    this.total = this.calculateTotal();
  }
  setStatus(status: string) {
    this.status = status;
  }
  private calculateTotal() {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
  public getTotal() {
    return this.total;
  }
  public getStatus() {
    return this.status;
  }
}
