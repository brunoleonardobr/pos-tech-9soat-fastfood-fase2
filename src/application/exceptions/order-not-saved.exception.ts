import CustomError, {
  UnprocessableEntityStatusCode,
} from "../../infra/exceptions/custom-error";

export default class OrderNotSavedException extends CustomError {
  constructor(message: string = "Order not saved") {
    super(message, OrderNotSavedException.name, UnprocessableEntityStatusCode);
  }
}
