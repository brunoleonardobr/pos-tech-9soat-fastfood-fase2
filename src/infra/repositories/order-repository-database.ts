import { OrderRepository } from "../../application/repositories/order-repository";
import Order from "../../domain/entities/order";
import DatabaseConnection from "../database/database-connection";
import { inject } from "../di/registry";

export default class OrderRepositoryDatabase implements OrderRepository {
  @inject("database")
  database?: DatabaseConnection;

  async create(order: Order): Promise<any> {
    let statement = `INSERT INTO orders (id, client_id, total, status) VALUES (?, ?, ?, ?);`;
    return this.database?.query(statement, [
      order.id,
      order.clientId,
      order.getTotal(),
      order.getStatus(),
    ]);
  }

  async list(): Promise<any> {
    let statement = `SELECT * FROM orders;`;
    const [ordersData] = await this.database?.query(statement, []);
    const orders: any[] = [];
    if (!ordersData.length) return orders;
    for (const orderData of ordersData) {
      orders.push({
        id: orderData.id,
        clientId: orderData.client_id,
        total: orderData.total,
        status: orderData.status,
      });
    }
    return orders;
  }
}
