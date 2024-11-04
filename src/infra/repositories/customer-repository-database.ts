import CustomerRepository from "../../application/repositories/customer-repository";
import Customer from "../../domain/entities/customer";
import DatabaseConnection from "../database/database-connection";
import { inject } from "../di/registry";

export default class CustomerRepositoryDatabase implements CustomerRepository {
  @inject("database")
  database?: DatabaseConnection;

  async save(customer: Customer): Promise<void> {
    let statement = `INSERT INTO customer (id, cpf, name, email) VALUES (?, ?, ?, ?);`;
    await this.database?.query(statement, [
      customer.id,
      customer.cpf,
      customer.name,
      customer.email,
    ]);
  }

  async getByCpf(cpf: string): Promise<any> {
    let statement = `SELECT * FROM customer WHERE cpf = ?;`;
    const [customer] = await this.database?.query(statement, [cpf]);
    return customer[0];
  }

  async getById(id: string): Promise<Customer | undefined> {
    let statement = `SELECT * FROM customer WHERE id = ?;`;
    const [customer] = await this.database?.query(statement, [id]);
    return customer[0];
  }
}
