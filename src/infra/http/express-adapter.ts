import HttpServer from "./http-server";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./../../../swagger.json";
import cors from "cors";
import { errorHandler } from "./error-handler";

export default class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
  register(method: string, url: string, callback: Function): void {
    this.app[method](url, async (req: any, res: any) => {
      try {
        const output = await callback(req.params, req.body);
        res.status(this.mapResponseStatus(method)).json(output);
      } catch (error: any) {
        const { statusCode, message } = errorHandler(error);
        res.status(statusCode).json(message);
      }
    });
  }
  listen(port: number): void {
    this.app.listen(port);
  }
  private mapResponseStatus(method: string): number {
    const status: { [key: string]: number } = {
      get: 200,
      post: 201,
      put: 200,
      delete: 204,
    };
    return status[method.toLowerCase()] ?? 200;
  }
}
