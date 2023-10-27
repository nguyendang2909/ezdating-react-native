import { Image } from 'react-native-image-crop-picker';

import { DevicePlatform, Gender, RelationshipGoal, RelationshipStatus } from './data.type';

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
    filterMinAge?: number;
    filterMaxAge?: number;
    filterGender?: Gender;
    filterMaxDistance?: number;
    jobTitle?: string;
    haveBasicInfo?: boolean;
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

  type FindManyNearbyProfiles = Pagination;

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
