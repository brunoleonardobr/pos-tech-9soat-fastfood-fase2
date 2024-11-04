import { ERROR_MESSAGES } from "../../enums/error-messages.enum";
import ProductNotFoundException from "../../exceptions/product-not-found.exception";
import ProductRepository from "../../repository/product-repository";
import UseCase from "../use-case";

export default class DeleteProduct implements UseCase {
  constructor(readonly repository: ProductRepository) {}

  async execute(input: Input) {
    const productExists = await this.repository.getById({ id: input.id });
    if (!productExists) {
      throw new ProductNotFoundException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    await this.repository.delete({ id: input.id });
  }
}

type Input = {
  id: string;
};
