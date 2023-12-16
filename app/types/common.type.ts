import { SIGN_IN_METHODS } from 'app/constants/constants';

export type ValueOf<T> = T[keyof T];

export type NearbyUserCursor = {
  excludedUserIds?: string[];
  minDistance?: number;
};

export type SignInMethod = (typeof SIGN_IN_METHODS)[keyof typeof SIGN_IN_METHODS];
