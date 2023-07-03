import { UploadFileShare, UserGender, UserLookingFor } from 'app/constants';
import { Image } from 'react-native-image-crop-picker';

// import {
//   EDrinking,
//   ELookingForGender,
//   ESmoking,
//   EUploadFileShare,
//   EWorkout,
// } from './constants';

export declare namespace ApiRequest {
  type FindAll = {
    fields?: string[];
  };

  type PaginationByPage = Partial<{
    page: number;
    pageSize: number;
  }>;

  type PaginationByLastId = Partial<{
    _lastId: string;
  }>;

  type FindManyByPage<T> = PaginationByPage & T;

  type FindManyByLastId<T> = PaginationByLastId & T;

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
    location: string;
    jobTitle?: string;
    haveBasicInfo?: boolean;
    introduction?: string;
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

  type UploadPhoto = {
    file: Image;
    share: UploadFileShare;
  };

  type FindAllConversations = {};

  type FindManyConversations = FindManyByLastId<FindAllConversations> & {};

  type FindAllMessages = {};

  type FindManyMessages = FindManyByLastId<FindAllMessages> & {
    _conversationId: string;
  };
}
