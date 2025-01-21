import OrderController from "../../controllers/order.controller";
import { inject } from "../di/registry";
import HttpServer from "../http/http-server";
import CheckoutDTO from "./dto/checkout.dto";

export default class OrderApiController {
  @inject("httpServer")
  private readonly httpServer?: HttpServer;
  private controller: OrderController;

  constructor() {
    this.controller = new OrderController();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.httpServer?.register(
      "post",
      "/checkout",
      async (params: any, body: CheckoutDTO) => {
        const order = await this.controller.checkout(body);
        return { message: "Order created successfully", order };
      }
    );
    this.httpServer?.register("get", "/orders", async () => {
      const orders = await this.controller.listOrders();
      return orders;
    });
    this.httpServer?.register(
      "get",
      "/orders/:id/status",
      async (params: any) => {
        const order = await this.controller.getStatusOrder(params);
        return order;
      }
    );
    this.httpServer?.register(
      "put",
      "/orders/:id/status/:status",
      async (params: any) => {
        const { id, status } = params;
        await this.controller.updateStatusOrder({ id, status });
        return { message: "Order updated successfully", data: { id, status } };
      }
    );
  }
}
