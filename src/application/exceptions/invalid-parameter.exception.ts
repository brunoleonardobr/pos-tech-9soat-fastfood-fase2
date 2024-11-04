import CustomError, {
  BadRequestStatusCode,
} from "../../infra/exceptions/custom-error";

export default class InvalidParameterException extends CustomError {
  constructor(message: string = "Invalid parameter") {
    super(message, InvalidParameterException.name, BadRequestStatusCode);
  }
}
