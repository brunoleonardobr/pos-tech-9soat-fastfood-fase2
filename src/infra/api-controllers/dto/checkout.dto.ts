import InvalidParameterException from "../../../application/exceptions/invalid-parameter.exception";

class ItemsDto {
  constructor(readonly productId: string, readonly quantity: number) {}
}

export default class CheckoutDTO {
  constructor(readonly items: Array<ItemsDto>, readonly clientId: string) {
    this.validate();
  }

  private validate() {
    if (!this.clientId) {
      throw new InvalidParameterException("Client id is required");
    }
  }
}
