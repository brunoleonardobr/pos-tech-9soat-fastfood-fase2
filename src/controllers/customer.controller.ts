import CustomerRepository from "../application/repositories/customer-repository";
import { CreateCustomer, GetCustomerByCpf } from "../application/usecases";
import CustomerGateway from "../gateways/customer.gateway";
import { CreateCustomerDTO } from "../infra/api-controllers/dto/create-customer.dto";
import GetCustomerByCpfDTO from "../infra/api-controllers/dto/get-customer-by-cpf.dto";
import { inject } from "../infra/di/registry";

export default class CustomerController {
  @inject("customerRepository")
  private readonly customerRepository!: CustomerRepository;
  async create(body: any) {
    const createCustomerDTO = new CreateCustomerDTO(
      body.cpf,
      body.name,
      body.email
    );
    const gateway = new CustomerGateway(this.customerRepository);
    const useCase = new CreateCustomer(gateway);
    const customer = await useCase.execute(createCustomerDTO);
    return customer;
  }
  async getByCpf(params: any) {
    const getCustomer = new GetCustomerByCpfDTO(params.cpf);
    const gateway = new CustomerGateway(this.customerRepository);
    const useCase = new GetCustomerByCpf(gateway);
    const customer = await useCase.execute(getCustomer);
    return customer;
  }
}
