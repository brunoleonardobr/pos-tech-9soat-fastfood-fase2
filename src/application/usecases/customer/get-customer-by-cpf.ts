import ICustomerGateway from "../../../interfaces/customer.gateway";
export default class GetCustomerByCpf {
  constructor(readonly customerGateway: ICustomerGateway) {}

  async execute({ cpf }: { cpf: string }) {
    return this.customerGateway.getByCpf(cpf);
  }
}
