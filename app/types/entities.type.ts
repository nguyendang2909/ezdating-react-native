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

export declare namespace Entity {
  type BaseEntity = {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type MediaFile = BaseEntity & {
    key: string;
    location: string;
    type: MediaFileType;
  };

  type User = BaseEntity & {
    coins?: number;
    email?: string;
    phoneNumber?: string;
    role?: UserRole;
    weight: number;
    status?: UserStatus;
  };

  type Country = BaseEntity & {
    name?: string;
    iso3?: string;
    numericCode?: string;
    iso2?: string;
    phoneCode?: string;
    capital?: string;
    currency?: string;
    currencyName?: string;
    currencySymbol?: string;
    tld?: string;
    native?: string;
    region?: string;
    subregion?: string;
    translations?: string;
    latitude?: string;
    longitude?: string;
    emoji?: string;
    emojiU?: string;
    sourceId?: number;
  };

  type State = BaseEntity & {
    name?: string;
    country?: Country;
    countryCode?: string;
    iso2?: string;
    type?: string;
    latitude?: string;
    longitude?: string;
    sourceId?: string;
  };

  type Profile = BaseEntity & {
    age?: number;
    birthday?: string;
    company?: string;
    educationLevel?: EducationLevel;
    gender?: Gender;
    geolocation?: {
      coordinates?: [number, number];
      type?: 'Point';
    };
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
    state?: State;
    learningTarget?: string;
    teachingSubject?: string;
  };

  type ProfileFilter = BaseEntity &
    Partial<{
      gender: Gender;
      maxDistance: number;
      maxAge: number;
      minAge: number;
      relationshipGoal?: RelationshipGoal;
    }>;

  type Message = BaseEntity & {
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

  type Match = BaseEntity & {
    lastMessage?: Message;
    userOneRead?: boolean;
    read?: boolean;
    targetProfile: Profile;
  };

  type View = BaseEntity & {
    profile?: Profile;
    targetProfile?: Profile;
    isLiked?: boolean;
  };
}
