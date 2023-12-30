// mongoose validation error

export function createValidationErrorObj(error) {
  let errorFields = Object.keys(error);

  let errorObj = {};

  errorFields.forEach((errorField) => {
    errorObj[errorField] = error[errorField].properties.message;
  });

  return errorObj;
}

export function createZodValidationErrorObj(issues) {
  let errorObj = {};

  issues.forEach((issue) => {
    errorObj[issue?.path[0]] = issue?.message;
  });

  return errorObj;
}
