import {
  EducationLevel,
  Gender,
  MediaFileType,
  Membership,
  RelationshipGoal,
  RelationshipStatus,
  UserRole,
  UserStatus,
} from './data.type';

export type BaseEntity = {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MediaFile = BaseEntity & {
  key: string;
  location: string;
  type: MediaFileType;
};

export type User = BaseEntity & {
  coins?: number;
  email?: string;
  phoneNumber?: string;
  role?: UserRole;
  weight: number;
  status?: UserStatus;
};

export type Profile = BaseEntity & {
  _userId: string;
  age?: number;
  birthday?: string;
  company?: string;
  educationLevel?: EducationLevel;
  filterGender?: Gender;
  filterMaxDistance?: number;
  filterMaxAge?: number;
  filterMinAge?: number;
  gender?: Gender;
  geolocation?: object;
  height?: number;
  introduce?: string;
  jobTitle?: string;
  hideAge?: boolean;
  hideDistance?: boolean;
  lastActivatedAt?: Date;
  languages?: string[];
  mediaFiles?: MediaFile[];
  membership?: Membership;
  nickname?: string;
  relationshipGoal?: RelationshipGoal;
  relationshipStatus?: RelationshipStatus;
  school?: string;
  weight?: number;
  distance?: number;
};

export type Message = BaseEntity & {
  _matchId?: string;
  _userId?: string;
  replyMessage?: Message;
  audio?: string;
  image?: string;
  // likeUserIds?: string[];
  // loveUserIds?: string[];
  text?: string;
  uuid?: string;
  video?: string;
};

export type Match = BaseEntity & {
  _userOneId: string;
  _userTwoId: string;
  lastMessage?: Message;
  userOneRead?: boolean;
  userTwoRead?: boolean;
  targetProfile?: Profile;
  read?: boolean;
  profileOne?: Profile;
  profileTwo?: Profile;
};

export type Like = BaseEntity &
  Partial<{
    _userId?: string;
    _targetUserId?: string;
    isMatched?: boolean;
    profile?: Profile;
  }>;
