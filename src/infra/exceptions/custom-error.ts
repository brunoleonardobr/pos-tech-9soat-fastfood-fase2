export const NotFoundExceptionStatusCode = 404;
export const BadRequestStatusCode = 400;
export const UnprocessableEntityStatusCode = 422;
export const ConflictExceptionStatusCode = 409;

export default class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, name: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = name || "CustomError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}
