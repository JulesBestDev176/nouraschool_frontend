export interface ApiErrorResponse {
  code: string;
  message: string;
  errors?: Array<{ field: string; message: string }>;
  correlationId?: string;
  timestamp?: string;
}
