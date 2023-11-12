import { CountryCode } from 'libphonenumber-js/types';
import { Image } from 'react-native-image-crop-picker';

import { Gender, RelationshipGoal } from './data.type';
import { ApiRequest } from './fe.type';

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

  type UpdateProfileFilter = {
    gender?: Gender;
    maxDistance: number;
    maxAge: number;
    minAge: number;
    relationshipGoal?: RelationshipGoal;
  };

  type SendMessage = {
    // relationshipId: string;
    text: string;
    // uuid: string;
    // replyMessageId?: string;
  };
}
