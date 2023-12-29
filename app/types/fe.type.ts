import { Image } from 'react-native-image-crop-picker';

import { DevicePlatform, Gender, RelationshipGoal, RelationshipStatus } from './data.type';
import { Entity } from './entities.type';

export declare namespace ApiRequest {
  type FindAll = {
    fields?: string[];
  };

  type Pagination = {
    _next?: string;
    _prev?: string;
  };

  type FindMany<T> = Pagination & T;

  type IsExistUser = {
    phoneNumber: string;
  };

  type SignInWithPhoneNumber = {
    token: string;
  };

  type SignInWithGoogle = {
    token: string;
  };

  type SignInWithFacebook = {
    token: string;
  };

  type SignInWithApple = {
    token: string;
  };

  type LoginByEmail = {
    email: string;
    password: string;
  };

  type LoginByGoogle = {
    token: string;
  };

  type LoginByFacebook = {
    token: string;
  };

  type LoginByPhoneNumber = {
    token: string;
  };

  type Logout = {
    refreshToken: string;
  };

  type RefreshAccessToken = {
    refreshToken: string;
  };

  type UpdateProfile = Partial<{
    birthday?: string;
    company?: string;
    // drinking?: EDrinking;
    // educationLevel?: EEducationLevel;
    gender?: Gender;
    jobTitle?: string;
    height?: number;
    hideAge?: boolean;
    hideDistance?: boolean;
    introduce?: string;
    languages?: string[];
    nickname?: string;
    latitude?: number;
    longitude?: number;
    photos?: string[];
    school?: string;
    relationshipGoal: RelationshipGoal;
    relationshipStatus: RelationshipStatus;
    weight?: number;
    stateId?: string;
    // smoking?: ESmoking;
    // workout?: EWorkout;
    learningTarget?: string;
    teachingSubject?: string;
  }>;

  type UpdateProfileFilter = {
    gender?: Gender;
    maxDistance?: number;
    minAge?: number;
    maxAge?: number;
    relationshipGoal?: RelationshipGoal;
  };

  type CreateProfile = {
    nickname: string;
    gender: Gender;
    birthday: string;
    relationshipGoal: RelationshipGoal;
    introduce?: string;
    stateId: string;
    learningTarget?: string;
    teachingSubject?: string;
  };

  type SearchUsersNearby = Pagination;

  type UploadPhoto = {
    file: Image;
  };

  type FindManyConversations = Pagination;

  type FindManyMessages = FindMany<{ matchId: string }>;

  type FindManySwipeProfiles = FindMany<object>;

  type FindManyMatches = Pagination;

  type FindManyNearbyProfiles = Pagination & {
    longitude?: number;
    latitude?: number;
  };

  type FindManyNextSwipeProfiles = Pagination;

  type SendLike = {
    targetUserId: string;
  };

  type SendView = {
    targetUserId: string;
  };

  type FindManyLikedMe = Pagination;

  type CreateMatch = {
    targetUserId: string;
  };

  type UpdateSignedDevice = {
    refreshToken: string;
    deviceToken: string;
    devicePlatform: DevicePlatform;
  };
}

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
    type?: string;
  };

  type PaginatedResponse<T> = {
    data: T[];
    pagination: Pagination;
    type: string;
  };

  type Match = FetchData<Entity.Match>;

  type Matches = PaginatedResponse<Entity.Match>;

  type Views = PaginatedResponse<Entity.View>;

  type View = FetchData<Entity.View>;

  type Profiles = PaginatedResponse<Entity.Profile>;

  type Unmatch = FetchData<{ _id?: string }>;

  type SuccessResponse = FetchData<{ success: boolean }>;

  type RefreshAccessToken = FetchData<{ accessToken: string }>;

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

  type User = FetchData<Entity.User>;

  type Profile = FetchData<Entity.Profile>;

  type ProfileFilterData = FetchData<Entity.ProfileFilter>;

  type Logged = FetchData<{
    accessToken: string;
    refreshToken: string;
  }>;

  type Messages = PaginatedResponse<Entity.Message> & {
    _matchId: string;
  };
}
