import { UserGender, UserRelationshipGoal } from 'app/constants';
import { Image } from 'react-native-image-crop-picker';

export declare namespace ApiRequest {
  type FindAll = {
    fields?: string[];
  };

  type Pagination = {
    after?: string;
    before?: string;
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
    introduce?: string;
    languages?: string[];
    nickname?: string;
    latitude?: number;
    longitude?: number;
    photos?: string[];
    school?: string;
    relationshipGoal: UserRelationshipGoal;
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

  type FindAllConversations = {};

  type FindManyConversations = FindMany<FindAllConversations> & {};

  type FindAllMessages = {};

  type FindManyMessages = FindMany<FindAllMessages> & {
    matchId: string;
  };
}
