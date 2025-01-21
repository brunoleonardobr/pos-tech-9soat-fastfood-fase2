import OrderGateway from "../../../gateways/order.gateway";
import OrdersNotFoundException from "../../exceptions/orders-not-found.exception";
import UseCase from "../use-case";

export default class GetStatusOrder implements UseCase {
  constructor(readonly orderGateway: OrderGateway) {}

  async execute(orderId: string): Promise<any> {
    const order = await this.orderGateway.findById(orderId);
    if (!order) throw new OrdersNotFoundException();
    return {
      id: order.id,
      status: order.getStatus(),
    };
  }
}
