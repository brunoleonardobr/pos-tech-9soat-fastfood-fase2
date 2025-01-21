import CustomerRepository from "../application/repositories/customer-repository";
import OrderItemRepository from "../application/repositories/order-item-repository";
import { OrderRepository } from "../application/repositories/order-repository";
import ProductRepository from "../application/repositories/product-repository";
import { Checkout } from "../application/usecases";
import GetStatusOrder from "../application/usecases/order/get-status-order";
import ListOrders from "../application/usecases/order/list-orders";
import CustomerGateway from "../gateways/customer.gateway";
import OrderItemGateway from "../gateways/order-item.gateway";
import OrderGateway from "../gateways/order.gateway";
import ProductGateway from "../gateways/product.gateway";
import CheckoutDTO from "../infra/api-controllers/dto/checkout.dto";
import { inject } from "../infra/di/registry";

export default class OrderController {
  @inject("orderRepository")
  private readonly orderRepository!: OrderRepository;
  @inject("productRepository")
  private readonly productRepository!: ProductRepository;
  @inject("orderItemRepository")
  private readonly orderItemRepository!: OrderItemRepository;
  @inject("customerRepository")
  private readonly customerRepository!: CustomerRepository;
  async checkout(body: any) {
    const checkoutDTO = new CheckoutDTO(body.items, body.clientId);
    const orderGateway = new OrderGateway(this.orderRepository);
    const productGateway = new ProductGateway(this.productRepository);
    const orderItemGateway = new OrderItemGateway(this.orderItemRepository);
    const customerGateway = new CustomerGateway(this.customerRepository);
    const useCase = new Checkout(
      productGateway,
      orderGateway,
      orderItemGateway,
      customerGateway
    );
    const order = await useCase.execute(checkoutDTO);
    return order;
  }
  async listOrders() {
    const orderGateway = new OrderGateway(this.orderRepository);
    const orderItemGateway = new OrderItemGateway(this.orderItemRepository);
    const useCase = new ListOrders(orderGateway, orderItemGateway);
    const orders = await useCase.execute();
    return orders;
  }
  async getStatusOrder(params: any) {
    const { id } = params;
    const orderGateway = new OrderGateway(this.orderRepository);
    const useCase = new GetStatusOrder(orderGateway);
    const order = await useCase.execute(id);
    return order;
  }
  async updateStatusOrder(params: any) {
    const { id, status } = params;
    const orderGateway = new OrderGateway(this.orderRepository);
    const useCase = new GetStatusOrder(orderGateway);
    await useCase.execute(id);
    return { message: "Order updated successfully", data: { id, status } };
  }
}
