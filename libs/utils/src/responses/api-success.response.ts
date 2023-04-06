import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  constructor(data: Pagination) {
    this.total = data.total;
    this.page = data.page;
    this.limit = data.limit;
    this.lastPage = data.lastPage;
  }

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  lastPage: number;
}

export class AppApiPaginatedResponse<TData> {
  @ApiProperty()
  data: TData[] | undefined;

  @ApiProperty({ type: Pagination })
  pagination: Pagination | undefined;

  @ApiProperty({ type: 'string' })
  message = 'success';

  static create<TData>(
    data: TData[],
    pagination?: Pagination,
    message?: string
  ): AppApiPaginatedResponse<TData> {
    const paginatedResponse = new AppApiPaginatedResponse<TData>();
    paginatedResponse.data = data;
    if (pagination) {
      paginatedResponse.pagination = pagination;
    } else {
      paginatedResponse.pagination = new Pagination({
        limit: data.length,
        page: 1,
        lastPage: 1,
        total: data.length,
      });
    }
    if (message) {
      paginatedResponse.message = message;
    }
    return paginatedResponse;
  }
}

export class AppApiSuccessResponse<TData> {
  data: TData | undefined;

  @ApiProperty({ type: 'string' })
  message = 'success';

  static create<TData>(
    data: TData,
    message?: string
  ): AppApiSuccessResponse<TData> {
    const apiSuccessResponse = new AppApiSuccessResponse<TData>();
    if (data) {
      apiSuccessResponse.data = data;
    }
    if (message) {
      apiSuccessResponse.message = message;
    }
    return apiSuccessResponse;
  }
}
