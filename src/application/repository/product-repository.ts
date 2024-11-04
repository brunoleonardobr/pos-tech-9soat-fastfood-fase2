export default interface ProductRepository {
  create(input: CreateProductInput): Promise<void>;
  update(input: UpdateProductInput): Promise<void>;
  delete(input: DeleteProductInput): Promise<void>;
  getByDescription(input: GetProductByName): Promise<any>;
  listByCategory(input: GetProductByCategory): Promise<any>;
  getById(input: GetProductById): Promise<any>;
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
