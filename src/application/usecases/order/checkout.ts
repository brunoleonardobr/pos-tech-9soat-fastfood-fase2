import Order from "../../../domain/entities/order";
import CustomerNotFoundException from "../../exceptions/customer-not-found.exception";
import InvalidParameterException from "../../exceptions/invalid-parameter.exception";
import OrderNotSavedException from "../../exceptions/order-not-saved.exception";
import ProductNotFoundException from "../../exceptions/product-not-found.exception";
import CustomerRepository from "../../repository/customer-repository";
import OrderItemRepository from "../../repository/order-item-repository";
import { OrderRepository } from "../../repository/order-repository";
import ProductRepository from "../../repository/product-repository";
import UseCase from "../use-case";

export default class Checkout implements UseCase {
  constructor(
    readonly productRepository: ProductRepository,
    readonly orderRepository: OrderRepository,
    readonly orderItemRepository: OrderItemRepository,
    readonly customerRepository: CustomerRepository
  ) {}

  async execute(input: CheckoutInput): Promise<CheckoutOutput> {
    this.validateInput(input);
    const client = await this.customerRepository.getById(input.clientId);
    if (!client) {
      throw new CustomerNotFoundException("Client not found");
    }
    const order = Order.create(client.id);
    await this.addItemsToOrder(input, order);
    order.setStatus("received");
    await this.saveOrder(order);
    await this.saveOrderItems(order);
    return { id: order.id, total: order.getTotal() };
  }

  private async saveOrderItems(order: Order) {
    await Promise.all(
      order.items.map((item) => this.orderItemRepository.create(item))
    );
  }

  private async saveOrder(order: Order) {
    try {
      await this.orderRepository.create(order);
    } catch (error: any) {
      throw new OrderNotSavedException(`Order not saved: ${error.message}`);
    }
  }

  private async addItemsToOrder(input: CheckoutInput, order: Order) {
    for (const item of input.items) {
      const product = await this.productRepository.getById({
        id: item.productId,
      });
      if (!product) {
        throw new ProductNotFoundException(
          `Product not found: ${item.productId}`
        );
      }
      order.addItem(product, item.quantity);
    }
  }

  private validateInput(input: CheckoutInput) {
    if (!input.clientId) {
      throw new InvalidParameterException("ClientId is required");
    }
    if (!input.items || input.items.length === 0) {
      throw new InvalidParameterException("Items is required");
    }

    input.items.forEach((item) => {
      if (!item.productId) {
        throw new InvalidParameterException("Item id is required");
      }
      if (!item.quantity) {
        throw new InvalidParameterException("Item quantity is required");
      }
      if (item.quantity <= 0) {
        throw new InvalidParameterException(
          "Item quantity must be greater than 0"
        );
      }
    });
  }
}

export type CheckoutInput = {
  items: ItemsInput[];
  clientId: string;
};

type ItemsInput = {
  productId: string;
  quantity: number;
};

export type CheckoutOutput = {
  id: string;
  total: number;
};
