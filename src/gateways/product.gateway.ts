import ProductRepository from "../application/repositories/product-repository";

export default class ProductGateway {
  constructor(readonly productRepository: ProductRepository) {}
  async create(input: CreateProductInput): Promise<void> {
    await this.productRepository.create(input);
  }
  async update(input: UpdateProductInput): Promise<void> {
    await this.productRepository.update(input);
  }
  async delete(input: DeleteProductInput): Promise<void> {
    return this.productRepository.delete(input);
  }
  async getByDescription(input: GetProductByName): Promise<any> {
    return this.productRepository.getByDescription(input);
  }
  async listByCategory(input: GetProductByCategory): Promise<any> {
    return this.productRepository.listByCategory(input);
  }
  async getById(input: GetProductById): Promise<any> {
    return this.productRepository.getById(input);
  }
}

export type GetProductByCategory = {
  category: string;
};

export type CreateProductInput = {
  id: string;
  description: string;
  price: number;
  category: string;
};

export type UpdateProductInput = {
  id: string;
  description?: string;
  price?: number;
  category?: string;
};

export type DeleteProductInput = {
  id: string;
};

export type GetProductByName = {
  description: string;
};

export type GetProductById = {
  id: string;
};
