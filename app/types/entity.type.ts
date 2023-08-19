import {
  MediaFileType,
  RelationshipUserStatus,
  UserEducationLevel,
  UserGender,
  UserLookingFor,
  UserRelationshipStatus,
  UserRole,
  UserStatus,
} from 'app/constants';

export declare namespace Entity {
  type BaseEntity = {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type MediaFile = BaseEntity &
    Partial<{
      _userId: string;
      key: string;
      location: string;
      // eslint-disable-next-line no-use-before-define
      type: MediaFileType;
    }>;

  type User = BaseEntity &
    Partial<{
      age?: number;
      birthday?: string;
      coins?: number;
      distance?: number;
      educationLevel: UserEducationLevel;
      email: string;
      // company?: string;
      // drinking?: EDrinking;
      // educationLevel?: EEducationLevel;
      gender?: UserGender;
      height: number;
      introduce: string;
      geolocation: string;
      lookingFor?: UserLookingFor;
      filterGender?: UserGender;
      filterMaxAge?: number;
      filterMaxDistance?: number;
      filterMinAge?: number;
      lastActivatedAt: string;
      mediaFiles: MediaFile[];
      nickname: string;
      password: string;
      phoneNumber: string;
      relationshipStatus: UserRelationshipStatus;
      role: UserRole;
      weight: number;
      status?: UserStatus;
      // jobTitle: string;
      // lookingForGender: ELookingForGender;
      // school: string;
      // smoking: ESmoking;
      // workout: EWorkout;
    }>;

  type Relationship = BaseEntity &
    Partial<{
      _userOneId: string;
      _userTwoId: string;
      _lastMessageUserId: string;
      canUserOneChat: string;
      canUserTwoChat: string;
      lastMessage: string;
      lastMessageAt: string;
      userOneRead: boolean;
      userOneStatus: RelationshipUserStatus;
      userTwoRead: boolean;
      userTwoStatus: RelationshipUserStatus;
      statusAt: string;
      userOneStatusAt: string;
      userTwoStatusAt: string;
      targetUser: User;
    }>;

  type Message = BaseEntity &
    Partial<{
      _relationshipId: string;
      _replyMessageId?: string;
      _userId: string;
      replyMessage?: Message;
      audio: string;
      image?: string;
      // likeUserIds?: string[];
      // loveUserIds?: string[];
      text?: string;
      uuid?: string;
      video?: string;
    }>;
}
