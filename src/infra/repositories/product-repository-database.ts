import ProductRepository, {
  CreateProductInput,
  DeleteProductInput,
  GetProductByCategory,
  GetProductById,
  GetProductByName,
  UpdateProductInput,
} from "../../application/repositories/product-repository";
import { Product } from "../../domain/entities/product";
import DatabaseConnection from "../database/database-connection";
import { inject } from "../di/registry";

export default class ProductRepositoryDatabase implements ProductRepository {
  @inject("database")
  database?: DatabaseConnection;

  async create(input: CreateProductInput): Promise<void> {
    const { id, description, price, category } = input;
    let statement = `INSERT INTO products (id, description, price, category) VALUES (?, ?, ?, ?);`;
    await this.database?.query(statement, [id, description, price, category]);
  }

  async update(input: UpdateProductInput): Promise<void> {
    const { params, values } = this.mapValues(input);
    const statement = `UPDATE products SET ${params} WHERE id=?;`;
    await this.database?.query(statement, [...values, input.id]);
  }

  async delete(input: DeleteProductInput): Promise<void> {
    const { id } = input;
    let statement = `DELETE FROM products WHERE id=?;`;
    await this.database?.query(statement, [id]);
  }

  async getByDescription(input: GetProductByName): Promise<any> {
    let statement = `SELECT * FROM products WHERE description = ?;`;
    const [product] = await this.database?.query(statement, [
      input.description,
    ]);
    return product[0];
  }

  async listByCategory(input: GetProductByCategory): Promise<any> {
    let statement = `SELECT * FROM products WHERE category = ?;`;
    const [productsData] = await this.database?.query(statement, [
      input.category,
    ]);
    const products: Product[] = [];
    if (!productsData) return products;
    for (const productData of productsData) {
      products.push(productData);
    }
    return products;
  }

  async getById(input: GetProductById): Promise<Product> {
    let statement = `SELECT * FROM products WHERE id = ?;`;
    const [product] = await this.database?.query(statement, [input.id]);
    if (product.length > 0) {
      product[0].price = parseFloat(product[0].price);
    }
    return product[0];
  }

  private mapValues(input: any) {
    const arrayOfParams: string[] = [];
    const values: any[] = [];
    for (const param of Object.keys(input)) {
      if (input[param] !== undefined && input[param] !== null) {
        arrayOfParams.push(`${param} = ?`);
        values.push(input[param]);
      }
    }
    const params = arrayOfParams.join(", ");
    return { params, values };
  }
}
