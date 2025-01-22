import { OrderStatus } from "../../../domain/enums/status.enum";
import OrderGateway from "../../../gateways/order.gateway";
import OrdersNotFoundException from "../../exceptions/orders-not-found.exception";
import UseCase from "../use-case";

export default class ProcessPayment implements UseCase {
  constructor(readonly orderGateway: OrderGateway) {}
  async execute(input: {
    orderId: string;
    statusPayment: string;
  }): Promise<any> {
    const order = await this.orderGateway.findById(input.orderId);
    if (!order) {
      throw new OrdersNotFoundException("Order not found.");
    }
    if (input.statusPayment === "paid") {
      order.setStatus(OrderStatus.RECEIVED);
      await this.orderGateway.updateStatus(order);
      return { success: true, message: "Payment successful." };
    } else {
      return { success: false, message: "Payment failed." };
    }
  }
}
