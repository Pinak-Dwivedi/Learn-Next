import CustomError from "./CustomError";
import errorResponse from "./errorResponse";
import {
  createValidationErrorObj,
  createZodValidationErrorObj,
} from "@/lib/createValidationErrorObj";

export default function asyncRouteHandlerWrapper(routeHandler) {
  return (req, context) => {
    return routeHandler(req, context).catch((error) => {
      // console.log(error);

      // check if it a thrown CustomError
      if (error.statusCode != null) {
        // check if it is zod validation error
        const issues = error.validationError?.issues;
        if (issues != null) {
          error.validationError = createZodValidationErrorObj(issues);
        }
        return errorResponse(error, Response);
      }

      // check if it is mongodb cast error
      if (error.message.includes("Cast to ObjectId failed")) {
        return errorResponse(new CustomError("Invalid id!", 404), Response);
      }

      // check if it is mongodb duplicate key error
      if (error.code === 11000) {
        let errorMsg = `${Object.keys(error.keyPattern)[0]} already exists!`;

        return errorResponse(new CustomError(errorMsg, 400), Response);
      }

      // check if it is mongoose validation error
      if (error?.errors != null) {
        let validationError = createValidationErrorObj(error.errors);

        return errorResponse(
          new CustomError("Errors in received data!", 400, validationError),
          Response,
        );
      }

      return errorResponse(new CustomError(), Response);
    });
  };
}
