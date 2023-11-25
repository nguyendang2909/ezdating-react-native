import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigatorScreenParams } from '@react-navigation/native';
import { HomeTabParamList } from 'app/navigators';

import { Like, Match, Profile } from './fe.type';

export type AppStackParamList = {
  ChatProfile: {
    profile: Profile;
  };
  EditInfoHeight: undefined;
  EDIT_INFO_LOCATION: undefined;
  EditInfoNickname: undefined;
  EditInfoWeight: undefined;
  DATING_NEARBY_FILTER: undefined;
  CREATE_BASIC_PROFILE: undefined;
  CREATE_BASIC_PHOTOS: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
  LikedMe: undefined;
  LikedMeProfile: {
    like: Like;
  };
  Main: undefined;
  Messages: {
    matchId: string;
    match: Match;
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
