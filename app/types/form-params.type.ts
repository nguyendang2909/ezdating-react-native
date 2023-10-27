import { CountryCode } from 'libphonenumber-js';
import { Image } from 'react-native-image-crop-picker';

import { ApiRequest } from './api-request.type';
import { Gender, RelationshipGoal } from './data.type';

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

  type CreateProfile = {
    nickname?: string;
    birthday?: string;
    gender?: Gender;
    relationshipGoal?: RelationshipGoal;
    introduce?: string;
  };

  type UpdateProfilePhoto = {
    photos: Image[];
  };

  type UpdateProfile = {
    birthday?: string;
    company?: string;
    // drinking?: EDrinking;
    // educationLevel?: EEducationLevel;
    gender?: Gender;
    jobTitle?: string;
    haveBasicInfo?: boolean;
    introduce?: string;
    nickname?: string;
    latitude?: number;
    longitude?: number;
    photos?: string[];
    school?: string;
    relationshipGoal: RelationshipGoal;
    // smoking?: ESmoking;
    // workout?: EWorkout;
  };

  type UpdateMatchFilter = {
    filterMinAge: number;
    filterMaxAge: number;
    filterGender?: Gender;
    filterMaxDistance: number;
  };

  type SendMessage = {
    // relationshipId: string;
    text: string;
    // uuid: string;
    // replyMessageId?: string;
  };
}
