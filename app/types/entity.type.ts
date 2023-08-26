import {
  MediaFileType,
  UserEducationLevel,
  UserGender,
  UserRelationshipGoal,
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
      company?: string;
      distance?: number;
      educationLevel: UserEducationLevel;
      email: string;
      // company?: string;
      // drinking?: EDrinking;
      // educationLevel?: EEducationLevel;
      gender?: UserGender;
      geolocation: string;
      height: number;
      hideAge: boolean;
      hideDistance: boolean;
      introduce: string;
      jobTitle: string;
      languages: string[];
      relationshipGoal?: UserRelationshipGoal;
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
      // school: string;
      // smoking: ESmoking;
      // workout: EWorkout;
    }>;

  type Match = BaseEntity &
    Partial<{
      _userOneId: string;
      _userTwoId: string;
      _lastMessageUserId: string;
      lastMessage: string;
      lastMessageAt: string;
      userOneRead: boolean;
      userTwoRead: boolean;
      matchedAt: string;
      targetUser: User;
    }>;

  type Message = BaseEntity &
    Partial<{
      _matchId: string;
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
