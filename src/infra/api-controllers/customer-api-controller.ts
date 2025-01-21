import CustomerController from "../../controllers/customer.controller";
import { inject } from "../di/registry";
import HttpServer from "../http/http-server";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import GetCustomerByCpfDTO from "./dto/get-customer-by-cpf.dto";

export default class CustomerApiController {
  @inject("httpServer")
  httpServer?: HttpServer;
  private controller: CustomerController;

  constructor() {
    this.controller = new CustomerController();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.httpServer?.register(
      "post",
      "/customer",
      async (params: any, body: CreateCustomerDTO) => {
        const customer = await this.controller.create(body);
        return { message: "Customer created successfully", customer };
      }
    );

    this.httpServer?.register(
      "get",
      "/customer/:cpf",
      async (params: GetCustomerByCpfDTO, body: any) => {
        const customer = await this.controller.getByCpf(params);
        return { message: "Customer found", customer };
      }
    );
  }
}
