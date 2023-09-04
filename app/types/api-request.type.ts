import {
  UserGender,
  UserRelationshipGoal,
  UserRelationshipStatus,
} from 'app/constants';
import { Image } from 'react-native-image-crop-picker';

export declare namespace ApiRequest {
  type FindAll = {
    fields?: string[];
  };

  type Pagination = {
    next?: string;
    prev?: string;
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

  type UpdateProfile = Partial<{
    birthday?: string;
    company?: string;
    // drinking?: EDrinking;
    // educationLevel?: EEducationLevel;
    gender?: UserGender;
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
    relationshipGoal: UserRelationshipGoal;
    relationshipStatus: UserRelationshipStatus;
    weight?: number;
    // smoking?: ESmoking;
    // workout?: EWorkout;
  }>;

  type UpdateProfileBasicInfo = Partial<{
    nickname: string;
    gender: UserGender;
    birthday: string;
    relationshipGoal: UserRelationshipGoal;
    introduce?: string;
  }>;

  type SearchUsersNearby = {
    params?: Pagination;
  };

  type UploadPhoto = {
    file: Image;
    isAvatar?: boolean;
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  type FindManyConversations = FindMany<{}>;

  // eslint-disable-next-line @typescript-eslint/ban-types
  type FindManyMessages = FindMany<{}> & {
    matchId: string;
  };

  type FindManySwipeUsers = FindMany<object>;

  type FindManyMatches = Pagination;
}
