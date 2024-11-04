import CustomerRepository from "../../repositories/customer-repository";

export default class GetCustomerByCpf {
  constructor(readonly customerRepository: CustomerRepository) {}

  async execute({ cpf }: { cpf: string }) {
    return this.customerRepository.getByCpf(cpf);
  }
}
