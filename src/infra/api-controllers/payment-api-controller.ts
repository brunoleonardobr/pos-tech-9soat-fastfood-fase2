import PaymentController from "../../controllers/payment.controller";
import { inject } from "../di/registry";
import HttpServer from "../http/http-server";

export default class PaymentApiController {
  @inject("httpServer")
  private readonly httpServer?: HttpServer;
  private controller: PaymentController;
  constructor() {
    this.controller = new PaymentController();
    this.registerRoutes();
  }
  private registerRoutes() {
    this.httpServer?.register(
      "post",
      "/webhooks/payment/process",
      async (params: any, body: any) => {
        await this.controller.processPayment(body);
        return { message: "Order payed successfully" };
      }
    );
  }
}
