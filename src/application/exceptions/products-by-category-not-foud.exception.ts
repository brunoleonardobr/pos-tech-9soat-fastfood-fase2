import CustomError, {
  NotFoundExceptionStatusCode,
} from "../../infra/exceptions/custom-error";

export default class ProductsByCategoryNotFoundException extends CustomError {
  constructor(message: string = "Product by category not found") {
    super(
      message,
      ProductsByCategoryNotFoundException.name,
      NotFoundExceptionStatusCode
    );
  }
}
