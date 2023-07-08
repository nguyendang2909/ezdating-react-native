import { Entity } from './entity.type';

export declare namespace ApiResponse {
  type Pagination = {
    cursors?: {
      after?: string | null;
      before?: string | null;
    };
  };

  type FetchData<T = any, R extends Record<string, any> = {}> = {
    [P in keyof R]?: R[P];
  } & {
    data?: T;
    type?: string;
  };

  type FetchPaginationData<T = any, R extends Record<string, any> = {}> = {
    [P in keyof R]?: R[P];
  } & FetchData<T, { pagination: Pagination }>;

  type Tokens = {
    accessToken?: string;
    refreshToken?: string;
  };

  type RemoveData = FetchData<{ success: true }>;

  type UploadedFileListData = FetchData<Entity.UploadedFile[]>;

  type UserData = FetchData<Entity.User>;

  type Logged = FetchData<{
    accessToken?: string;
    refreshToken?: string;
    user?: Entity.User;
  }>;
}
