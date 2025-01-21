import { ERROR_MESSAGES } from "../../../domain/enums/error-messages.enum";
import ProductNotFoundException from "../../exceptions/product-not-found.exception";
import ProductGateway from "../../repositories/product-repository";
import UseCase from "../use-case";

export default class DeleteProduct implements UseCase {
  constructor(readonly productGateway: ProductGateway) {}

  async execute(input: Input) {
    const productExists = await this.productGateway.getById({ id: input.id });
    if (!productExists) {
      throw new ProductNotFoundException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    await this.productGateway.delete({ id: input.id });
  }
}

type Input = {
  id: string;
};
