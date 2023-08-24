import { AppStackParamList } from './navigators';

declare global {
  namespace ReactNavigation {
    type RootParamList = AppStackParamList;
  }
}
