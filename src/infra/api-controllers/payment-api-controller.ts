import ProcessPayment from "../../application/usecases/payment/process-order";
import { inject } from "../di/registry";
import HttpServer from "../http/http-server";

export default class PaymentApiController {
  @inject("httpServer")
  private readonly httpServer?: HttpServer;
  @inject("processPayment")
  private readonly processPayment?: ProcessPayment;
  constructor() {
    this.registerRoutes();
  }
  private registerRoutes() {
    this.httpServer?.register(
      "post",
      "/webhooks/payment/process",
      async (params: any, body: any) => {
        const { orderId, status } = body;
        await this.processPayment?.execute({
          orderId,
          statusPayment: status,
        });
        return { message: "Order payed successfully" };
      }
    );
  }
}
