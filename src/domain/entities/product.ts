import { ERROR_MESSAGES } from "../enums/error-messages.enum";
import UnprocessableEntityException from "../exceptions/unprocessable-entity.exception";

import crypto from "crypto";

export class Product {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly category: string,
    readonly price: number
  ) {
    this.validate();
  }
  static create(description: string, price: number, category: string): Product {
    const id = crypto.randomUUID();
    return new Product(id, description, category, price);
  }
  private validate() {
    if (this.price <= 0) {
      throw new UnprocessableEntityException(ERROR_MESSAGES.PRICE_INVALID);
    }
  }
}
