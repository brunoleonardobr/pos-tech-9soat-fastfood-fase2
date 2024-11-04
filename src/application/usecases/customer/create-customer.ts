import Customer from "../../../domain/entities/customer";
import { ERROR_MESSAGES } from "../../enums/error-messages.enum";
import CustomerAlreadyExistsException from "../../exceptions/customer-already-exists.exception";
import CustomerRepository from "../../repositories/customer-repository";

export default class CreateCustomer {
  constructor(readonly customerRepository: CustomerRepository) {}

  async execute(data: CreateCustomerDTO): Promise<Customer> {
    await this.checkIfCustomerExists(data.cpf);

    const customer = Customer.create(data);
    await this.customerRepository.save(customer);
    return customer;
  }

  private async checkIfCustomerExists(cpf: string): Promise<void> {
    const exists = await this.customerRepository.getByCpf(cpf);
    if (exists) {
      throw new CustomerAlreadyExistsException(
        ERROR_MESSAGES.CPF_ALREADY_REGISTERED
      );
    }
  }
}

export type CreateCustomerDTO = {
  cpf: string;
  name: string;
  email: string;
};
