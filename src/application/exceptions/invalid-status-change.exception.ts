import CustomError, {
  UnprocessableEntityStatusCode,
} from "../../infra/exceptions/custom-error";

export default class InvalidStatusChangeException extends CustomError {
  constructor(message: string = "Invalid status change") {
    super(
      message,
      InvalidStatusChangeException.name,
      UnprocessableEntityStatusCode
    );
  }
}
