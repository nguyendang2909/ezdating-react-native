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
  };

  type BasicInfo = {
    nickname: string;
    birthday?: string;
    gender?: EGender;
    lookingFor: string;
    introduce?: string;
    haveBasicInfor?: boolean;
  };
}
