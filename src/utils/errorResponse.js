export default function errorResponse(error, Response) {
  if (error.validationError == null) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.statusCode,
      }
    );
  }
  return Response.json(
    {
      success: false,
      message: error.message,
      validationError: error.validationError,
    },
    {
      status: error.statusCode,
    }
  );
}
