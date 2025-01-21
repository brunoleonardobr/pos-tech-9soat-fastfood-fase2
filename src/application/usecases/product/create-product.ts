import { Product } from "../../../domain/entities/product";
import ProductGateway from "../../../gateways/product.gateway";
import ProductAlreadyExists from "../../exceptions/product-already-exists.exception";
import UseCase from "../use-case";

export default class CreateProduct implements UseCase {
  constructor(readonly productGateway: ProductGateway) {}

  async execute(input: Input): Promise<Output> {
    const productSaved = await this.productGateway.getByDescription({
      description: input.description,
    });
    if (productSaved) throw new ProductAlreadyExists();
    const product = Product.create(
      input.description,
      input.price,
      input.category
    );
    await this.productGateway.create(product);
    return this.mapOutput(product);
  }

  private mapOutput(product: Product): Output {
    return {
      id: product.id,
      description: product.description,
      price: product.price,
      category: product.category,
    };
  }
}

type Input = {
  description: string;
  price: number;
  category: string;
};

type Output = {
  id: string;
  description: string;
  price: number;
  category: string;
};
