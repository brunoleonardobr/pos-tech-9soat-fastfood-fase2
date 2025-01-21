import { OrderRepository } from "../application/repositories/order-repository";
import ProcessPayment from "../application/usecases/payment/process-order";
import PaymentGateway from "../gateways/paymentGateway";
import { inject } from "../infra/di/registry";

export default class PaymentController {
  @inject("orderRepository")
  private readonly orderRepository!: OrderRepository;
  async processPayment(body: any) {
    const { orderId, status } = body;
    const paymentGateway = new PaymentGateway(this.orderRepository);
    const useCase = new ProcessPayment(paymentGateway);
    await useCase.execute({ orderId, statusPayment: status });
  }
}
