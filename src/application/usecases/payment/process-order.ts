import { OrderStatus } from "../../../domain/enums/status.enum";
import PaymentGateway from "../../../gateways/paymentGateway";
import OrdersNotFoundException from "../../exceptions/orders-not-found.exception";
import UseCase from "../use-case";

export default class ProcessPayment implements UseCase {
  constructor(readonly paymentGateway: PaymentGateway) {}
  async execute(input: {
    orderId: string;
    statusPayment: string;
  }): Promise<any> {
    const order = await this.paymentGateway.findById(input.orderId);
    if (!order) {
      throw new OrdersNotFoundException("Order not found.");
    }
    if (input.statusPayment === "paid") {
      order.setStatus(OrderStatus.RECEIVED);
      await this.paymentGateway.updateStatus(order);
      return { success: true, message: "Payment successful." };
    } else {
      return { success: false, message: "Payment failed." };
    }
  }
}
