import { HTTP_STATUS } from "../../../constants/httpConstants";

export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string, code = "AUTHENTICATION_ERROR") {
    super(message, code, HTTP_STATUS.UNAUTHORIZED);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string, code = "AUTHORIZATION_ERROR") {
    super(message, code, HTTP_STATUS.FORBIDDEN);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, code = "NOT_FOUND") {
    super(message, code, HTTP_STATUS.NOT_FOUND);
  }
}