import ProductGateway from "../../../gateways/product.gateway";
import ProductsByCategoryNotFoundException from "../../exceptions/products-by-category-not-foud.exception";
import UseCase from "../use-case";

export default class ListProductsByCategory implements UseCase {
  constructor(readonly productGateway: ProductGateway) {}

  async execute(input: Input): Promise<ProductOutput[]> {
    const { category } = input;
    const products = await this.productGateway.listByCategory({ category });
    if (!products.length) throw new ProductsByCategoryNotFoundException();
    return this.mapProducts(products);
  }
  private mapProducts(products: ProductOutput[]): ProductOutput[] {
    return products.map((product: ProductOutput) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
    }));
  }
}

type Input = {
  category: string;
};

type ProductOutput = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};
