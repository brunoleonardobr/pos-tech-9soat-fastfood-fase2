import OrderItemRepository from "../../application/repositories/order-item-repository";
import OrderItem from "../../domain/entities/order-item";
import DatabaseConnection from "../database/database-connection";
import { inject } from "../di/registry";

export default class OrderItemRepositoryDatabase
  implements OrderItemRepository
{
  @inject("database")
  database?: DatabaseConnection;
  async create(orderItem: OrderItem): Promise<void> {
    let statement = `INSERT INTO order_items (id, product_id, order_id, price, quantity) VALUES (?, ?, ?, ?, ?);`;
    return this.database?.query(statement, [
      orderItem.id,
      orderItem.productId,
      orderItem.orderId,
      orderItem.price,
      orderItem.quantity,
    ]);
  }
  async getByOrderId(orderId: string): Promise<any> {
    let statement = `SELECT * FROM order_items WHERE order_id = ?;`;
    const [orderItemsData] = await this.database?.query(statement, [orderId]);
    let orderItems = [];
    for (const orderItemData of orderItemsData) {
      statement = `SELECT description, category FROM products WHERE id = ?;`;
      const [productData] = await this.database?.query(statement, [
        orderItemData.product_id,
      ]);
      orderItemData.id = orderItemData.id.toString();
      orderItemData.product_id = orderItemData.product_id.toString();
      orderItems.push({
        product: productData[0].description,
        price: orderItemData.price,
        quantity: orderItemData.quantity,
      });
    }
    return orderItems;
  }
}
