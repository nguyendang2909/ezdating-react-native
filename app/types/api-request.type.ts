import { UserGender, UserLookingFor } from 'app/constants';
import { Image } from 'react-native-image-crop-picker';

export declare namespace ApiRequest {
  type FindAll = {
    fields?: string[];
  };

  type Pagination = {
    cursor?: string;
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
    birthDay?: string;
    company?: string;
    // drinking?: EDrinking;
    // educationLevel?: EEducationLevel;
    gender?: UserGender;
    jobTitle?: string;
    haveBasicInfo?: boolean;
    introduce?: string;
    nickname?: string;
    latitude?: number;
    longitude?: number;
    // lookingForGender?: ELookingForGender;
    photos?: string[];
    school?: string;
    lookingFor: UserLookingFor;
    // smoking?: ESmoking;
    // workout?: EWorkout;
  }>;

  type UpdateProfileBasicInfo = Partial<{
    nickname: string;
    gender: UserGender;
    birthday: string;
    lookingFor: UserLookingFor;
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
    conversationId: string;
  };
}
