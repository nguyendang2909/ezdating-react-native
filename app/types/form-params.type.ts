import { UserGender, UserRelationshipGoal } from 'app/constants';
import { CountryCode } from 'libphonenumber-js';
import { Image } from 'react-native-image-crop-picker';

import { ApiRequest } from './api-request.type';

export declare namespace FormParams {
  type LoginByEmail = ApiRequest.LoginByEmail;

  type LoginByPhoneNumber = {
    phoneNumber: string;
    token: string;
  };

  type SignInWithPhoneNumber = {
    dialCode: string;
    phoneNumber: string;
    countryCode: CountryCode;
  };

  type BasicInfo = {
    nickname?: string;
    birthday?: string;
    gender?: UserGender;
    relationshipGoal?: UserRelationshipGoal;
    introduce?: string;
    haveBasicInfor?: boolean;
  };

  type UpdateProfilePhoto = {
    photos: Image[];
  };

  type UpdateProfile = {
    birthday?: string;
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
    photos?: string[];
    school?: string;
    relationshipGoal: UserRelationshipGoal;
    // smoking?: ESmoking;
    // workout?: EWorkout;
  };

  type UpdateMatchFilter = {
    filterMinAge: number;
    filterMaxAge: number;
    filterGender?: UserGender;
    filterMaxDistance: number;
  };

  type SendMessage = {
    // relationshipId: string;
    text: string;
    // uuid: string;
    // replyMessageId?: string;
  };
}
