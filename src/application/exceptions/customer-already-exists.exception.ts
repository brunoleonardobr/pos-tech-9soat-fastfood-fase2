import CustomError, {
  ConflictExceptionStatusCode,
} from "../../infra/exceptions/custom-error";

export default class CustomerAlreadyExistsException extends CustomError {
  constructor(message: string = "Customer already exists") {
    super(
      message,
      CustomerAlreadyExistsException.name,
      ConflictExceptionStatusCode
    );
  }
}
