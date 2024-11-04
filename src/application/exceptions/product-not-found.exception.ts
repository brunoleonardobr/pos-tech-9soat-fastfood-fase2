import CustomError, {
  NotFoundExceptionStatusCode,
} from "../../infra/exceptions/custom-error";

export default class ProductNotFoundException extends CustomError {
  constructor(message: string = "Product not found") {
    super(message, ProductNotFoundException.name, NotFoundExceptionStatusCode);
  }
}
