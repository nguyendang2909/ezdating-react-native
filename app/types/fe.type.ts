import { Image } from 'react-native-image-crop-picker';

import {
  DevicePlatform,
  EducationLevel,
  Gender,
  MediaFileType,
  Membership,
  RelationshipGoal,
  RelationshipStatus,
  UserRole,
  UserStatus,
} from './data.type';

export type BaseEntity = {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MediaFile = BaseEntity & {
  key: string;
  location: string;
  type: MediaFileType;
};

export type User = BaseEntity & {
  coins?: number;
  email?: string;
  phoneNumber?: string;
  role?: UserRole;
  weight: number;
  status?: UserStatus;
};

export type Profile = BaseEntity & {
  age?: number;
  birthday?: string;
  company?: string;
  educationLevel?: EducationLevel;
  gender?: Gender;
  geolocation?: {
    coordinates?: [number, number];
    type?: 'Point';
  };
  height?: number;
  introduce?: string;
  jobTitle?: string;
  hideAge?: boolean;
  hideDistance?: boolean;
  lastActivatedAt?: Date;
  languages?: string[];
  mediaFiles?: MediaFile[];
  membership?: Membership;
  nickname?: string;
  relationshipGoal?: RelationshipGoal;
  relationshipStatus?: RelationshipStatus;
  school?: string;
  weight?: number;
  distance?: number;
};

export type ProfileFilter = BaseEntity &
  Partial<{
    gender: Gender;
    maxDistance: number;
    maxAge: number;
    minAge: number;
    relationshipGoal?: RelationshipGoal;
  }>;

export type Message = BaseEntity & {
  _matchId?: string;
  _userId?: string;
  replyMessage?: Message;
  audio?: string;
  image?: string;
  // likeUserIds?: string[];
  // loveUserIds?: string[];
  text?: string;
  uuid?: string;
  video?: string;
};

export type Match = BaseEntity & {
  lastMessage?: Message;
  userOneRead?: boolean;
  read?: boolean;
  targetProfile: Profile;
};

export type Like = BaseEntity & {
  profile: Profile;
  targetProfile: Profile;
  isMatched?: boolean;
};

export type View = BaseEntity & {
  profile?: Profile;
  targetProfile?: Profile;
  isLiked?: boolean;
};

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
    // smoking?: ESmoking;
    // workout?: EWorkout;
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
    longitude: number;
    latitude: number;
  };

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

  type ProfileFilterData = FetchData<ProfileFilter>;

  type Logged = FetchData<{
    accessToken: string;
    refreshToken: string;
  }>;

  type Messages = PaginatedResponse<Message> & {
    _matchId: string;
  };
}
