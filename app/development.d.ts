import { AppStackParamList } from './navigators';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
