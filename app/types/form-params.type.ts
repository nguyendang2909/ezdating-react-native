import { UserGender, UserLookingFor } from 'app/constants';
import { CountryCode } from 'libphonenumber-js';
import { IMessage } from 'react-native-gifted-chat';
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
    lookingFor?: UserLookingFor;
    introduce?: string;
    haveBasicInfor?: boolean;
  };

  type UpdateProfilePhoto = {
    photos: Image[];
  };

  type SendMessage = Omit<IMessage, 'createdAt'> & {
    relationshipId: string;
    createdAt: string;
  };
}
