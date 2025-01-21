import Customer from "../domain/entities/customer";

export default interface ICustomerGateway {
  save(customer: Customer): Promise<void>;
  getByCpf(cpf: string): Promise<Customer | undefined>;
  getById(id: string): Promise<Customer | undefined>;
}
