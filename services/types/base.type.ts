export interface IItemResponse<T> {
  message: string;
  statusCode: number;
  item: T;
}

export interface IListResponse<T> {
  message: string;
  statusCode: number;
  items: T[];
  pageSize: number;
  pageIndex: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
}

export interface IPaginationRequest {
  pageIndex?: number;
  pageSize?: number;
}
