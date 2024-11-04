import crypto from "crypto";

export default class Customer {
  constructor(
    readonly id: string,
    readonly cpf: string,
    readonly name: string,
    readonly email: string
  ) {}

  static create(data: any): Customer {
    const id = crypto.randomUUID();
    return new Customer(id, data.cpf, data.name, data.email);
  }
}
