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
    let statement = `SELECT * FROM orders
                    WHERE status != 'finished'
                    ORDER BY 
                    FIELD(status, 'ready', 'progress', 'received'),
                    created_at ASC;`;
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

  async findById(id: string): Promise<any> {
    let statement = `SELECT * FROM orders WHERE id = ?;`;
    const [order] = await this.database?.query(statement, [id]);
    if (!order.length) return null;
    return new Order(order[0].id, order[0].client_id, order[0].status);
  }

  async updateStatus(order: Order): Promise<any> {
    let statement = `UPDATE orders SET status = ? WHERE id = ?;`;
    return this.database?.query(statement, [order.getStatus(), order.id]);
  }
}
