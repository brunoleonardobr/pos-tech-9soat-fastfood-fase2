import mysql from "mysql2/promise";
import DatabaseConnection from "./database-connection";
import "dotenv/config";

export default class MysqlAdapter implements DatabaseConnection {
  connection: any;
  retryDelay: number = 5000; // Atraso entre tentativas em milissegundos (5 segundos)
  constructor() {
    this.connect();
  }

  async connect(): Promise<void> {
    let retries = 0;
    while (true) {
      try {
        const host = process.env.DB_HOST || "mysql";
        const user = process.env.DB_USERNAME || "root";
        const password = process.env.DB_PASSWORD || "admin";
        const database = process.env.DB_NAME || "fastfood";

        this.connection = await mysql.createConnection({
          host,
          user,
          password,
          database,
        });

        console.log("Conectado ao banco de dados com sucesso");
        return;
      } catch (error: any) {
        retries++;
        console.log(
          `Tentativa de conexão ${retries} falhou: ${
            error.message
          }. Tentando novamente em ${this.retryDelay / 1000} segundos...`
        );
        await new Promise((res) => setTimeout(res, this.retryDelay));
      }
    }
  }
  async query(statement: string, params: any): Promise<any> {
    try {
      return this.connection.execute(statement, params);
    } catch (error) {
      console.log("Erro ao executar a query: ", error);
    }
  }
  async close(): Promise<void> {
    this.connection.end();
  }
}
