export interface IPagination {
  pageSize: number;
  pageIndex: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
