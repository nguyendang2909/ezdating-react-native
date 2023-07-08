// export enum EUserLookingFor {
//   lover = 'lover',
//   friend = 'friend',
//   partner = 'partner',
//   marriage = 'marriage',
//   oneNightStand = 'oneNightStand',
// }

// export enum ELookingForGender {
//   male = 'male',
//   female = 'female',
//   lgbt = 'lgbt',
// }

// export enum EEducationLevel {
//   highSchool = 'highSchool',
//   bachelor = 'bachelor',
//   master = 'master',
//   phD = 'phD',
// }

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

// export enum ELookingForRelationship {
//   friend = 'friend',
//   oneNightStand = 'oneNightStand',
//   longTermRelationship = 'longTermRelationship',
//   partner = 'partner',
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

export const UserRoles = {
  admin: 'admin',
  manager: 'manager',
  member: 'member',
};

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export const UserGenders = {
  male: 'male',
  female: 'female',
  lgbt: 'lgbt',
};
export type UserGender = (typeof UserGenders)[keyof typeof UserGenders];

export const UserStatuses = {
  banned: 'banned',
  activated: 'activated',
  deactivate: 'deactivate',
};

export type UserStatus = (typeof UserStatuses)[keyof typeof UserStatuses];

export const UserLookingFors = {
  lover: 'lover',
  friend: 'friend',
  partner: 'partner',
  marriage: 'marriage',
  oneNightStand: 'oneNightStand',
};

export type UserLookingFor =
  (typeof UserLookingFors)[keyof typeof UserLookingFors];

export const LIMIT_UPLOADED_PHOTOS = 6;

export const UploadFileTypes = {
  photo: 'photo',
  video: 'video',
};

export type UploadFileType =
  (typeof UploadFileTypes)[keyof typeof UploadFileTypes];

export const UploadFileShares = {
  public: 'public',
  private: 'private',
};

export type UploadFileShare =
  (typeof UploadFileShares)[keyof typeof UploadFileShares];

export const RelationshipUserStatuses = {
  like: 'like',
  unlike: 'unlike',
  cancel: 'cancel',
  block: 'block',
} as const;

export type RelationshipUserStatus =
  (typeof RelationshipUserStatuses)[keyof typeof RelationshipUserStatuses];
