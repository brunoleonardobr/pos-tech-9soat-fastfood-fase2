import ProcessPayment from "../../application/usecases/payment/process-order";
import { inject } from "../di/registry";
import HttpServer from "../http/http-server";

export default class PaymentController {
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
        const order = await this.processPayment?.execute({
          orderId,
          statusPayment: status,
        });
        return { message: "Order created successfully", order };
      }
    );
  }
}
