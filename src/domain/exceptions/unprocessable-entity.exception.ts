import CustomError, {
  UnprocessableEntityStatusCode,
} from "../../infra/exceptions/custom-error";

export default class UnprocessableEntityException extends CustomError {
  constructor(message: string = "Unprocessable Entity") {
    super(
      message,
      UnprocessableEntityException.name,
      UnprocessableEntityStatusCode
    );
  }
}
