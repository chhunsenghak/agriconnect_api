export interface ValidationError {
  field: string;
  message: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type ErrorPayload = ValidationError[] | Record<string, any>;

export interface ApiResponse<T, E = ErrorPayload> {
  success: boolean;
  message: string;
  data?: T;
  errors?: E;
  meta?: PaginationMeta | Record<string, any>;
}
