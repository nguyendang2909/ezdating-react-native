import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigatorScreenParams } from '@react-navigation/native';
import { HomeTabParamList } from 'app/navigators';

import { Entity } from '.';

export type AppStackParamList = {
  ChatProfile: undefined;
  EditInfoHeight: undefined;
  EditInfoNickname: undefined;
  EditInfoWeight: undefined;
  EditMatchFilter: undefined;
  UpdateProfileBasicInfo: undefined;
  UpdateProfilePhotos: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
  LikedMe: undefined;
  Main: undefined;
  Messages: {
    matchId: string;
  };
  ProfileEdit: undefined;
  ProfileNearby: {
    user: Entity.User;
  };
  ProfileSetting: undefined;
  SelectRelationshipGoal: undefined;
  SignIn: undefined;
  SignInWithOtpPhoneNumber: {
    otpConfirm?: FirebaseAuthTypes.ConfirmationResult;
    user?: {
      phoneNumber?: string;
    };
  };
  SignInWithPhoneNumber: undefined;
  Welcome: undefined;
};
