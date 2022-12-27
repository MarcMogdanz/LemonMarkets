import { AxiosError, isAxiosError } from "axios";

// TODO: use `type` instead of `enum`?
enum LemonErrorType {
  "GENERIC" = "GENERIC",
  "BAD_REQUEST" = "BAD_REQUEST",
  "UNAUTHORIZED" = "UNAUTHORIZED",
  "PAYMENT_REQUIRED" = "PAYMENT_REQUIRED",
  "FORBIDDEN" = "FORBIDDEN",
  "NOT_FOUND" = "NOT_FOUND",
  "CONFLICT" = "CONFLICT",
  "UNPROCESSABLE_ENTITY" = "UNPROCESSABLE_ENTITY",
  "OUT_OF_RATE_LIMIT" = "OUT_OF_RATE_LIMIT",
  "INTERNAL_SERVER" = "INTERNAL_SERVER",
  "SERVICE_UNAVAILABLE" = "SERVICE_UNAVAILABLE",
}

export class LemonError extends Error {
  readonly type: LemonErrorType;

  constructor(type: LemonErrorType, message?: string) {
    super();
    this.type = type;
    this.message = message || "An unknown error occurred";
  }

  static parse(
    error: Error | AxiosError | unknown,
    fallbackMessage?: string
  ): LemonError {
    if (error instanceof LemonError) {
      return error;
    }

    if (isAxiosError(error) && error.response?.status) {
      // TODO: type out error responses and write type guard
      const errorCode = error.response.data.error_code;

      // specific errors
      switch (errorCode) {
        case "invalid_query":
          throw new LemonBadRequestError(
            error.response.data.error_message
              ? `Query is not valid: ${error.response.data.error_message}`
              : "Query is not valid"
          );

        case "order_idempotency_violation":
          throw new LemonBadRequestError(
            "Idempotency violation within the last 7 days"
          );

        case "token_invalid":
          throw new LemonUnauthorizedError(
            "Your API key is revoked or user is deleted/suspended"
          );

        case "pin_not_set":
          throw new LemonConflictError("PIN is not set");

        case "pin_missing":
          throw new LemonBadRequestError("PIN is missing");

        case "pin_invalid":
          throw new LemonForbiddenError("PIN is invalid");

        case "withdraw_insufficient_funds":
          throw new LemonUnprocessableEntityError("Insufficient funds");

        case "withdraw_limit_exceeded":
          throw new LemonUnprocessableEntityError("Withdraw limit exceeded");

        case "withdraw_request_limit_exceeded":
          throw new LemonUnprocessableEntityError(
            "Withdraw request limit exceeded"
          );

        case "forbidden_in_current_state":
          throw new LemonConflictError(
            error.response.data.error_message
              ? `Forbidden in current state: ${error.response.data.error_message}`
              : "Forbidden in current state"
          );

        case "plan_not_allowed":
          throw new LemonPaymentRequiredError("Plan not allowed");

        case "insufficient_holdings":
          throw new LemonUnprocessableEntityError(
            "Insufficient holdings to sell"
          );

        case "order_expiration_date_invalid":
          throw new LemonBadRequestError(
            "Order expires before market opens again"
          );

        case "order_total_price_limit_exceeded":
          throw new LemonBadRequestError("Order total price limit exceeded");

        case "forbidden_for_venue":
          throw new LemonBadRequestError(
            "Order couldn't be placed for the venue in the current API environment"
          );

        case "trading_disabled":
          throw new LemonBadRequestError(
            "Order can't be placed if trading is disabled"
          );

        case "order_limit_exceeded":
          throw new LemonBadRequestError("Daily limit of orders exceeded");

        case "instrument_not_tradable":
          throw new LemonBadRequestError("Instrument is not tradable");

        case "account_insufficient_funds":
          throw new LemonUnprocessableEntityError(
            "Insufficient funds to place or activate order"
          );

        case "trading_blocked":
          throw new LemonServiceUnavailableError(
            "Trading is currently blocked globally"
          );

        case "order_not_inactive":
          throw new LemonConflictError(
            "Order can't be activated if it is not inactive"
          );

        case "order_not_terminated":
          throw new LemonConflictError(
            "Order can't be cancelled if it is not terminating or terminated state"
          );
      }

      // fallbacks
      switch (error.response.status) {
        case 400:
          throw new LemonBadRequestError(fallbackMessage);

        case 401:
          throw new LemonUnauthorizedError(fallbackMessage);

        case 402:
          throw new LemonPaymentRequiredError(fallbackMessage);

        case 403:
          throw new LemonForbiddenError(fallbackMessage);

        case 404:
          throw new LemonNotFoundError("Resource could not be found");

        case 409:
          throw new LemonConflictError(fallbackMessage);

        case 422:
          throw new LemonUnprocessableEntityError(fallbackMessage);

        case 429:
          throw new LemonOutOfRateLimitError(fallbackMessage);

        case 500:
          throw new LemonInternalServerError(fallbackMessage);

        case 503:
          throw new LemonServiceUnavailableError(fallbackMessage);
      }
    }

    throw new LemonError(LemonErrorType.GENERIC, fallbackMessage);
  }
}

export class LemonBadRequestError extends LemonError {
  constructor(message?: string) {
    super(LemonErrorType.BAD_REQUEST, message);
  }
}

export class LemonUnauthorizedError extends LemonError {
  constructor(message?: string) {
    super(LemonErrorType.UNAUTHORIZED, message);
  }
}

export class LemonPaymentRequiredError extends LemonError {
  constructor(message?: string) {
    super(LemonErrorType.PAYMENT_REQUIRED, message);
  }
}

export class LemonForbiddenError extends LemonError {
  constructor(message?: string) {
    super(LemonErrorType.FORBIDDEN, message);
  }
}

export class LemonNotFoundError extends LemonError {
  constructor(message?: string) {
    super(LemonErrorType.NOT_FOUND, message);
  }
}

export class LemonConflictError extends LemonError {
  constructor(message?: string) {
    super(LemonErrorType.CONFLICT, message);
  }
}

export class LemonUnprocessableEntityError extends LemonError {
  constructor(message?: string) {
    super(LemonErrorType.UNPROCESSABLE_ENTITY, message);
  }
}

export class LemonOutOfRateLimitError extends LemonError {
  constructor(message?: string) {
    super(LemonErrorType.OUT_OF_RATE_LIMIT, message);
  }
}

export class LemonInternalServerError extends LemonError {
  constructor(message?: string) {
    super(LemonErrorType.INTERNAL_SERVER, message);
  }
}

export class LemonServiceUnavailableError extends LemonError {
  constructor(message?: string) {
    super(LemonErrorType.SERVICE_UNAVAILABLE, message);
  }
}
