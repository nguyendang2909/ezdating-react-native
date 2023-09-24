import { Entity } from './entity.type';

export declare namespace ApiResponse {
  type Pagination = {
    cursors?: {
      next?: string | null;
      prev?: string | null;
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type FetchData<T, R extends Record<string, any> = object> = {
    [P in keyof R]?: R[P];
  } & {
    data?: T;
    type?: string;
  };

  type PaginatedResponse<T> = {
    data?: T[];
    pagination?: {
      _next?: null | string;
      _prev?: null | string;
    };
    type?: string;
  };

  type SuccessResponse = FetchData<{ success: boolean }>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type FetchPaginationData<T, R extends Record<string, any> = object> = {
    [P in keyof R]?: R[P];
  } & FetchData<T, { pagination: Pagination }>;

  type Tokens = {
    accessToken?: string;
    refreshToken?: string;
  };

  type RemoveData = FetchData<{ success: true }>;

  type UploadedFileListData = FetchData<Entity.MediaFile[]>;

  type UserData = FetchData<Entity.User>;

  type Logged = FetchData<{
    accessToken?: string;
    refreshToken?: string;
    user?: Entity.User;
  }>;

  type MessagesData = FetchPaginationData<
    Entity.Message[],
    { _matchId: string }
  >;
}
