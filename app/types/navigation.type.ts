import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigatorScreenParams } from '@react-navigation/native';
import { HomeTabParamList } from 'app/navigators';

import { Like, Profile } from './fe.type';

export type AppStackParamList = {
  ChatProfile: {
    profile: Profile;
  };
  EditInfoHeight: undefined;
  EditInfoNickname: undefined;
  EditInfoWeight: undefined;
  dating_nearby_filter: undefined;
  CreateProfile: undefined;
  UpdateProfilePhotos: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
  LikedMe: undefined;
  LikedMeProfile: {
    like: Like;
  };
  Main: undefined;
  Messages: {
    matchId: string;
  };
  ProfileEdit: undefined;
  ProfileNearby: {
    profile: Profile;
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
  DATING_SWIPE_PROFILE: {
    profile: Profile;
  };
};
