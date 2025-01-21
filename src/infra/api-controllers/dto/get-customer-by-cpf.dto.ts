import InvalidParameterException from "../../../application/exceptions/invalid-parameter.exception";

export default class GetCustomerByCpfDTO {
  constructor(readonly cpf: string) {
    this.validate();
  }
  private validate() {
    if (!this.cpf) {
      throw new InvalidParameterException("CPF is required");
    }
  }
}
