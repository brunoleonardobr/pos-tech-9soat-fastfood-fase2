import Checkout from "../../application/usecases/order/checkout";
import GetStatusOrder from "../../application/usecases/order/get-status-order";
import ListOrders from "../../application/usecases/order/list-orders";
import UpdateStatusOrder from "../../application/usecases/order/update-status-order";
import { inject } from "../di/registry";
import HttpServer from "../http/http-server";
import CheckoutDTO from "./dto/checkout.dto";

export default class OrderController {
  @inject("httpServer")
  private readonly httpServer?: HttpServer;
  @inject("checkout")
  private readonly checkout?: Checkout;
  @inject("listOrders")
  private readonly listOrders?: ListOrders;
  @inject("getStatusOrder")
  private readonly getStatusOrder?: GetStatusOrder;
  @inject("updateStatusOrder")
  private readonly updateStatusOrder?: UpdateStatusOrder;

  constructor() {
    this.registerRoutes();
  }

  private registerRoutes() {
    this.httpServer?.register(
      "post",
      "/checkout",
      async (params: any, body: CheckoutDTO) => {
        const checkoutDTO = new CheckoutDTO(body.items, body.clientId);
        const order = await this.checkout?.execute(checkoutDTO);
        return { message: "Order created successfully", order };
      }
    );
    this.httpServer?.register("get", "/orders", async () => {
      const orders = await this.listOrders?.execute();
      return orders;
    });
    this.httpServer?.register(
      "get",
      "/orders/:id/status",
      async (params: any) => {
        const { id } = params;
        const order = await this.getStatusOrder?.execute(id);
        return order;
      }
    );
    this.httpServer?.register(
      "put",
      "/orders/:id/status/:status",
      async (params: any) => {
        const { id, status } = params;
        await this.updateStatusOrder?.execute({ id, status });
        return { message: "Order updated successfully", data: { id, status } };
      }
    );
  }
}
