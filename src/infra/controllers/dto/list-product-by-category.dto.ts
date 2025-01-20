import InvalidParameterException from "../../../application/exceptions/invalid-parameter.exception";

export default class ListProductByCategoryDTO {
  constructor(readonly category: string) {
    this.validate();
  }
  private validate() {
    if (!this.category) {
      throw new InvalidParameterException("Category is required");
    }
  }
}
