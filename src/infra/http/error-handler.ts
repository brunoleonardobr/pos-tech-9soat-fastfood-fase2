import CustomError from "../exceptions/custom-error";

export const errorHandler = (err: any) => {
  if (err instanceof CustomError) {
    return {
      statusCode: err.statusCode,
      message: `${err.name}: ${err.message}`,
    };
  }
  return { statusCode: 500, message: "Internal Server Error" };
};
