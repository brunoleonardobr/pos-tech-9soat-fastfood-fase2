import { OrderRepository } from "../application/repositories/order-repository";
import ProcessPayment from "../application/usecases/payment/process-order";
import OrderGateway from "../gateways/order.gateway";
import { inject } from "../infra/di/registry";

export default class PaymentController {
  @inject("orderRepository")
  private readonly orderRepository!: OrderRepository;
  async processPayment(body: any) {
    const { orderId, status } = body;
    const orderGateway = new OrderGateway(this.orderRepository);
    const useCase = new ProcessPayment(orderGateway);
    await useCase.execute({ orderId, statusPayment: status });
  }
}
