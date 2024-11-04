import { ERROR_MESSAGES } from "../../enums/error-messages.enum";
import InvalidParameterException from "../../exceptions/invalid-parameter.exception";
import ProductRepository from "../../repositories/product-repository";
import UseCase from "../use-case";

export default class UpdateProduct implements UseCase {
  constructor(readonly repository: ProductRepository) {}

  async execute(input: Input) {
    this.validateInput(input);
    const productExists = await this.repository.getById({ id: input.id });
    if (!productExists) {
      throw new InvalidParameterException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    const updateData = this.mapUpdateData(input);
    await this.repository.update(updateData);
  }

  private validateInput(input: Input): void {
    if (!input.id) {
      throw new InvalidParameterException(ERROR_MESSAGES.ID_REQUIRED);
    }
    const { description, price, category } = input;
    if (!description && price == null && !category) {
      throw new InvalidParameterException(
        ERROR_MESSAGES.AT_LEAST_ONE_PARAM_REQUIRED
      );
    }
  }

  private mapUpdateData(input: Input): UpdateData {
    const { id, description, price, category } = input;
    const updateData: UpdateData = { id };

    if (description) updateData.description = description;
    if (price != null) updateData.price = price;
    if (category) updateData.category = category;

    return updateData;
  }
}

type Input = {
  id: string;
  description: string;
  price: number;
  category: string;
};

type UpdateData = {
  id: string;
  description?: string; // Make optional
  price?: number; // Make optional
  category?: string; // Make optional
};
