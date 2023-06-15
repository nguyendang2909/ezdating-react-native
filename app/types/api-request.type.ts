import {
  EDrinking,
  EEducationLevel,
  EGender,
  ELookingForGender,
  ESmoking,
  EWorkout,
} from './enums';

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
    drinking?: EDrinking;
    educationLevel?: EEducationLevel;
    gender?: EGender;
    location: string;
    nickname?: string;
    jobTitle?: string;
    introduction?: string;
    latitude?: number;
    longitude?: number;
    lookingForGender?: ELookingForGender;
    photos?: string[];
    school?: string;
    smoking?: ESmoking;
    workout?: EWorkout;
  }>;

  type CreatePhoto = {
    file: File;
    isPrivate?: boolean;
  };

  type FindAllConversations = {};

  type FindManyConversations = FindManyByLastId<FindAllConversations> & {};

  type FindAllMessages = {};

  type FindManyMessages = FindManyByLastId<FindAllMessages> & {
    _conversationId: string;
  };
}
