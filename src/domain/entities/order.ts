import OrderItem from "./order-item";
import crypto from "crypto";
import { Product } from "./product";
import { OrderStatus } from "../enums/status.enum";
import InvalidStatusChangeException from "../../application/exceptions/invalid-status-change.exception";
export default class Order {
  private total: number;
  private status: OrderStatus;
  readonly items: OrderItem[] = [];
  constructor(
    readonly id: string,
    readonly clientId: string,
    status: OrderStatus
  ) {
    this.total = this.calculateTotal();
    this.status = status;
  }
  private static readonly allowedTransitions: Record<
    OrderStatus,
    OrderStatus[]
  > = {
    [OrderStatus.OPEN]: [OrderStatus.RECEIVED],
    [OrderStatus.RECEIVED]: [OrderStatus.PROGRESS],
    [OrderStatus.PROGRESS]: [OrderStatus.READY],
    [OrderStatus.READY]: [OrderStatus.FINISHED],
    [OrderStatus.FINISHED]: [],
  };
  static create(clientId: string): Order {
    const id = crypto.randomUUID();
    return new Order(id, clientId, OrderStatus.OPEN);
  }
  addItem(product: Product, quantity: number) {
    const item = OrderItem.create(product.id, this.id, quantity, product.price);
    this.items.push(item);
    this.total = this.calculateTotal();
  }
  setStatus(newStatus: OrderStatus) {
    if (this.canTransitionTo(newStatus)) {
      this.status = newStatus;
    } else {
      throw new InvalidStatusChangeException();
    }
  }
  private canTransitionTo(newStatus: OrderStatus): boolean {
    const allowedStatuses = Order.allowedTransitions[this.status];
    return allowedStatuses.includes(newStatus);
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
