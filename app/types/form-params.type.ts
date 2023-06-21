import { EUserLookingFor } from 'app/constants';
import { CountryCode } from 'libphonenumber-js';
import { Image } from 'react-native-image-crop-picker';

import { ApiRequest } from './api-request.type';
import { EGender } from './enums';

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
    gender?: EGender;
    lookingFor?: EUserLookingFor;
    introduce?: string;
    haveBasicInfor?: boolean;
  };

  type UpdateProfilePhoto = {
    photos: Image[];
  };
}
