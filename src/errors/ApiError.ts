
export class ApiError extends Error {
  constructor(readonly statusCode: number, readonly message: string) {
    super(message);
  }
}

export class NotFoundError extends ApiError {
  constructor(readonly message: string = "Not Found") {
    super(404, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(readonly message: string = "Forbidden") {
    super(403, message);
  }
}

// 401: token is expire/ dont log in
export class UnauthorizedError extends ApiError {
  constructor(readonly message: string = "Unauthorized request") {
    super(401, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(readonly message: string = "Internal Server Error") {
    super(500, message);
  }
}

export class BadRequest extends ApiError {
  constructor(readonly message: string = "Bad request") {
    super(400, message);
  }
}
