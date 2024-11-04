import CustomError, {
  NotFoundExceptionStatusCode,
} from "../../infra/exceptions/custom-error";

export default class OrdersNotFoundException extends CustomError {
  constructor(message: string = "Orders not found") {
    super(message, OrdersNotFoundException.name, NotFoundExceptionStatusCode);
  }
}
