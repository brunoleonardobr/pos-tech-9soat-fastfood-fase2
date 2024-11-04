import crypto from "crypto";

export default class OrderItem {
  constructor(
    readonly id: string,
    readonly productId: string,
    readonly orderId: string,
    readonly quantity: number,
    readonly price: number
  ) {}

  static create(
    productId: string,
    orderId: string,
    quantity: number,
    price: number
  ) {
    const id = crypto.randomUUID();
    return new OrderItem(id, productId, orderId, quantity, price);
  }
}
