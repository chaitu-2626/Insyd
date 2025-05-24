import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ErrorMessage {
  field: string;
  message: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string | ErrorMessage[];
  data?: T;
  error?: string;
}



// Sends a successful API response with optional data and a custom status code.
export function success<T>(res: Response, message: string, data?: T, status = StatusCodes.OK) {
  const body: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(status).json(body);
}

// Sends an error API response with a message and a custom status code.
export function error(res: Response, message: string | ErrorMessage[], status = StatusCodes.INTERNAL_SERVER_ERROR) {
  const body: ApiResponse = {
    success: false,
    message,
  };
  res.status(status).json(body);
}

// Sends a validation error API response, typically for invalid input.
export function validationError(res: Response, message: ErrorMessage[]) {
  error(res, message, StatusCodes.BAD_REQUEST);
}
  