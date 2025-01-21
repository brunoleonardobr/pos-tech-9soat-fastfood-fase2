import ProductsController from "../../controllers/products.controller";
import { inject } from "../di/registry";
import HttpServer from "../http/http-server";
import DeleteProductParamDTO from "./dto/delete-product-param.dto";
import ListProductByCategoryDTO from "./dto/list-product-by-category.dto";
import UpdateProductParamDTO from "./dto/update-product-param.dto";
import UpdateProductDTO from "./dto/update-product.dto";

export default class ProductsApiController {
  @inject("httpServer")
  httpServer?: HttpServer;
  private controller: ProductsController;

  constructor() {
    this.controller = new ProductsController();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.httpServer?.register(
      "post",
      "/product",
      async (params: any, body: any) => {
        const product = await this.controller.createProduct(body);
        return { message: "Product created successfully", product };
      }
    );
    this.httpServer?.register(
      "patch",
      "/product/:id",
      async (params: UpdateProductParamDTO, body: UpdateProductDTO) => {
        await this.controller.updateProduct(params, body);
        return { message: "Product updated successfully" };
      }
    );
    this.httpServer?.register(
      "delete",
      "/product/:id",
      async (params: DeleteProductParamDTO, body: any) => {
        await this.controller.removeProduct(params);
        return { message: "Product deleted successfully" };
      }
    );
    this.httpServer?.register(
      "get",
      "/product/:category",
      async (params: ListProductByCategoryDTO, body: any) => {
        const products = await this.controller.listProductsByCategory(params);
        return { products };
      }
    );
  }
}
