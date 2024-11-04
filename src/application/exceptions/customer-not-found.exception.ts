import CustomError, {
  NotFoundExceptionStatusCode,
} from "../../infra/exceptions/custom-error";

export default class CustomerNotFoundException extends CustomError {
  constructor(message: string = "Customer not found") {
    super(message, CustomerNotFoundException.name, NotFoundExceptionStatusCode);
  }
}
