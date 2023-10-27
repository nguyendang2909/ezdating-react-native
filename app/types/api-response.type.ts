import { Like, Match, MediaFile, Message, Profile, User } from './entity.type';

export declare namespace ApiResponse {
  type Pagination = {
    _next: string | null;
    _prev?: string | null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type FetchData<T, R extends Record<string, any> = object> = {
    [P in keyof R]?: R[P];
  } & {
    data: T;
    type: string;
  };

  type PaginatedResponse<T> = {
    data: T[];
    pagination: Pagination;
    type: string;
  };

  type MatchData = FetchData<Match>;

  type Matches = PaginatedResponse<Match>;

  type Likes = PaginatedResponse<Like>;

  type Profiles = PaginatedResponse<Profile>;

  type Unmatch = FetchData<{ _id?: string }>;

  type SuccessResponse = FetchData<{ success: boolean }>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type FetchPaginationData<T, R extends Record<string, any> = object> = {
    [P in keyof R]?: R[P];
  } & FetchData<T, { pagination: Pagination }>;

  type Tokens = {
    accessToken: string;
    refreshToken: string;
  };

  type RemoveData = FetchData<{ success: true }>;

  type UploadedFileListData = FetchData<MediaFile[]>;

  type UserData = FetchData<User>;

  type ProfileData = FetchData<Profile>;

  type Logged = FetchData<{
    accessToken: string;
    refreshToken: string;
  }>;

  type Messages = PaginatedResponse<Message> & {
    _matchId: string;
  };
}
