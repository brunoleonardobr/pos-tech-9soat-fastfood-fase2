import { inject } from "../di/registry";
import HttpServer from "../http/http-server";

export default class HealthCheckApiController {
  @inject("httpServer")
  httpServer?: HttpServer;

  constructor() {
    this.httpServer?.register(
      "get",
      "/healthy",
      async (params: any, body: any) => {
        return "healthy";
      }
    );
  }
}
