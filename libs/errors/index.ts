export class ServerError extends Error {
  public name = "Server Error";
  constructor(message?: string) {
    super(message);
  }
}

export class SessionError extends Error {
  public name = "Session Error";
  constructor(message?: string) {
    super(message);
  }
}

export class DatabaseError extends Error {
  public name = "Database Error";
  constructor(message?: string) {
    super(message);
  }
}

export class AuthenticationError extends Error {
  public name = "Authentication Error";
  constructor(message?: string) {
    super(message);
  }
}

import { ValidationError } from "yup";
export { ValidationError } from "yup";

const errors = [ServerError, SessionError, DatabaseError, AuthenticationError, ValidationError];

export class NotFoundError extends Error {
  public name = "Not Found Error";
  constructor(message?: string) {
    super(message);
  }
}

export default errors;
