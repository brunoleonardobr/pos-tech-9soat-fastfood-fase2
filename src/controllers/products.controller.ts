import ProductRepository from "../application/repositories/product-repository";
import {
  CreateProduct,
  ListProductsByCategory,
  UpdateProduct,
} from "../application/usecases";
import DeleteProduct from "../application/usecases/product/remove-product";
import ProductGateway from "../gateways/product.gateway";
import CreateProductDTO from "../infra/api-controllers/dto/create-product.dto";
import DeleteProductParamDTO from "../infra/api-controllers/dto/delete-product-param.dto";
import ListProductByCategoryDTO from "../infra/api-controllers/dto/list-product-by-category.dto";
import UpdateProductParamDTO from "../infra/api-controllers/dto/update-product-param.dto";
import UpdateProductDTO from "../infra/api-controllers/dto/update-product.dto";
import { inject } from "../infra/di/registry";

export default class ProductsController {
  @inject("productRepository")
  private readonly productRepository!: ProductRepository;
  constructor() {}
  async createProduct(body: any) {
    const createProductDTO = new CreateProductDTO(
      body.description,
      body.price,
      body.category
    );
    const gateway = new ProductGateway(this.productRepository);
    const useCase = new CreateProduct(gateway);
    const product = await useCase.execute(createProductDTO);
    return product;
  }
  async updateProduct(params: any, body: any) {
    const updateProductDTO = new UpdateProductDTO(
      body.description,
      body.price,
      body.category
    );
    const updateProductParamDTO = new UpdateProductParamDTO(params.id);
    const gateway = new ProductGateway(this.productRepository);
    const useCase = new UpdateProduct(gateway);
    await useCase.execute({
      id: updateProductParamDTO.id,
      ...updateProductDTO,
    });
    return { message: "Product updated successfully" };
  }
  async removeProduct(params: any) {
    const deleteProductParamDTO = new DeleteProductParamDTO(params.id);
    const gateway = new ProductGateway(this.productRepository);
    const useCase = new DeleteProduct(gateway);
    await useCase.execute({ id: deleteProductParamDTO.id });
    return { message: "Product deleted successfully" };
  }
  async listProductsByCategory(params: any) {
    const listProductsByCategoryDTO = new ListProductByCategoryDTO(
      params.category
    );
    const gateway = new ProductGateway(this.productRepository);
    const useCase = new ListProductsByCategory(gateway);
    const products = await useCase.execute(listProductsByCategoryDTO);
    return products;
  }
}
