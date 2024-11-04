import CustomError, {
  ConflictExceptionStatusCode,
} from "../../infra/exceptions/custom-error";

export default class ProductAlreadyExistsException extends CustomError {
  constructor(message: string = "Product already exists") {
    super(
      message,
      ProductAlreadyExistsException.name,
      ConflictExceptionStatusCode
    );
  }
}
