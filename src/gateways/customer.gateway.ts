import CustomerRepository from "../application/repositories/customer-repository";
import Customer from "../domain/entities/customer";
import ICustomerGateway from "../interfaces/customer.gateway";

export default class CustomerGateway implements ICustomerGateway {
  constructor(readonly customerRepository: CustomerRepository) {}
  async save(customer: Customer): Promise<void> {
    await this.customerRepository.save(customer);
  }
  async getByCpf(cpf: string): Promise<Customer | undefined> {
    return await this.customerRepository.getByCpf(cpf);
  }
  async getById(id: string): Promise<Customer | undefined> {
    return await this.customerRepository.getById(id);
  }
}
