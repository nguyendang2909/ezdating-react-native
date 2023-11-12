// export enum EEducationLevel {
//   highSchool = 'highSchool',
//   bachelor = 'bachelor',
//   master = 'master',
//   phD = 'phD',
// }

import { RelationshipGoal, RelationshipStatus, TxKey } from '../types';
import { RELATIONSHIP_GOALS, RELATIONSHIP_STATUSES } from './data.constant';

// export enum ESmoking {
//   nonSmoker = 'nonSmoker',
//   smoker = 'smoker',
//   tryingToQuit = 'tryingToQuit',
// }

// export enum EWorkout {
//   everyDay = 'everyDay',
//   often = 'often',
//   sometimes = 'sometimes',
//   never = 'never',
// }

// export enum EDrinking {
//   nondrinker = 'nondrinker',
//   drinker = 'drinker',
// }

// export enum ERelationshipStatus {
//   single = 'single',
//   inLove = 'inLove',
//   married = 'married',
//   divorcedWithoutKids = 'divorcedWithoutKids',
//   divorcedWithKids = 'divorcedWithKids',
//   singleParent = 'singleParent',
// }

// export enum EUploadFileType {
//   photo = 'photo',
//   video = 'video',
// }

// export enum EUploadFileShare {
//   public = 'public',
//   Private = 'private',
// }

export const AGES = {
  MIN: 18,
  MAX: 100,
};

export const DATE_FORMATS = {
  DATE: 'YYYY-MM-DD',
};

export const QUERY_OPTIONS = {
  MESSAGES: {
    KEY: {
      PRIMARY: 'messages',
      SECONDARY: {
        NEWEST: 'newest',
        NEXT: 'next',
      },
    },
  },
  MATCH: {
    KEY: {
      PRIMARY: 'match',
    },
  },
  CONVERSATIONS: {
    KEY: {
      PRIMARY: 'conversations',
      SECONDARY: {
        NEWEST: 'newest',
        NEXT: 'next',
      },
    },
  },
} as const;

export const QUERY_KEYS = {
  NEARBY_USERS: {
    KEY: 'nearbyUsers',
    STALE_TIME: 10 * (6 * 1000) * 6,
  },
  PROFILE: 'profile',
  LIKED_ME: 'likedMe',
};

export const UserRoles = {
  admin: 1,
  manager: 2,
  member: 3,
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export const UserGenders = {
  male: 1,
  female: 2,
} as const;

export type UserGender = (typeof UserGenders)[keyof typeof UserGenders];

// Const
export const RELATIONSHIP_GOAL_MESSAGES: Record<RelationshipGoal, TxKey> = {
  [RELATIONSHIP_GOALS.BOY_GIRL_FRIEND]: 'Boy/Girl friend',
  [RELATIONSHIP_GOALS.GET_MARRIED]: 'Get married',
  [RELATIONSHIP_GOALS.MAKE_FRIENDS]: 'Make friends',
  [RELATIONSHIP_GOALS.ONE_NIGHT_STAND]: 'One-Night stand',
  [RELATIONSHIP_GOALS.SEX_PARTNER]: 'Sex partner',
};

export const GENDER_MESSAGES: Record<UserGender, TxKey> = {
  [UserGenders.male]: 'Male',
  [UserGenders.female]: 'Female',
};

export const RELATIONSHIP_STATUS_MESSAGES: Record<RelationshipStatus, TxKey> = {
  [RELATIONSHIP_STATUSES.DIVORCED_WITH_CHILDREN]: 'Divorced with children',
  [RELATIONSHIP_STATUSES.DIVORCED_WITHOUT_CHILDREN]: 'Divorced without children',
  [RELATIONSHIP_STATUSES.HAVE_BOY_GIRL_FRIEND]: 'Have boy/girl friend',
  [RELATIONSHIP_STATUSES.MARRIED]: 'Married',
  [RELATIONSHIP_STATUSES.SINGLE]: 'Single',
  [RELATIONSHIP_STATUSES.SINGLE_MOM_DAD]: 'Single mom/dad',
};

export const API_TAGS = {
  MY_USER: 'my_user',
  MY_PROFILE_FILTER: 'my_profile_filter',
  MY_PROFILE: 'my_profile',
  NEARBY_PROFILES: 'nearby_profiles',
} as const;

export const ARR_API_TAGS = Object.values(API_TAGS);
