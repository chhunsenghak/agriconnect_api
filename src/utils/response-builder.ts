import { ApiResponse, ErrorPayload, PaginationMeta } from "../types/api-response.ts";

export class ResponseBuilder {
  static success<T>(
    message: string,
    data?: T,
    meta?: Record<string, any>
  ): ApiResponse<T> {
    return { success: true, message, data, meta };
  }

  static created<T>(message: string, data?: T): ApiResponse<T> {
    return { success: true, message, data };
  }

  static paginated<T>(
    message: string,
    data: T[],
    meta: PaginationMeta
  ): ApiResponse<T[]> {
    return { success: true, message, data, meta };
  }

  static error(
    message: string,
    errors?: ErrorPayload
  ): ApiResponse<null> {
    return { success: false, message, errors };
  }
}
