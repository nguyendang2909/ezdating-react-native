import {
  RelationshipUserStatus,
  UploadFileShare,
  UploadFileType,
  UserGender,
  UserLookingFor,
  UserRole,
} from 'app/constants';

export declare namespace Entity {
  type BaseEntity = {
    id: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type UploadedFile = BaseEntity &
    Partial<{
      key: string;
      location: string;
      // eslint-disable-next-line no-use-before-define
      user: User;
      type: UploadFileType;
      share: UploadFileShare;
    }>;

  type User = BaseEntity &
    Partial<{
      avatar: string;
      avatarFile: Entity.UploadedFile;
      introduce: string;
      age?: number;
      birthday?: string;
      company?: string;
      // drinking?: EDrinking;
      // educationLevel?: EEducationLevel;
      email: string;
      uploadFiles: UploadedFile[];
      fullname: string;
      gender?: UserGender;
      height: number;
      location: string;
      lookingFor?: UserLookingFor;
      jobTitle: string;
      // lookingForGender: ELookingForGender;
      nickname: string;
      haveBasicInfo: boolean;
      password: string;
      phoneNumber: string;
      role: UserRole;
      school: string;
      weight: number;
      // smoking: ESmoking;
      // workout: EWorkout;
    }>;

  type Relationship = BaseEntity &
    Partial<{
      userOne: User;
      userTwo: User;
      userOneStatus: RelationshipUserStatus;
      userTwoStatus: RelationshipUserStatus;
      statusAt: string;
      userOneStatusAt: string;
      userTwoStatusAt: string;
      canUserOneChat: string;
      canUserTwoChat: string;
      lastMessage: string;
      lastMessageAt: string;
      lastMessageBy: string;
      lastMessageRead: boolean;
      targetUser: User;
    }>;

  type Message = BaseEntity &
    Partial<{
      replyMessage?: Message;
      relationship: Partial<Relationship>;
      audio: string;
      image?: string;
      likeUserIds?: string[];
      loveUserIds?: string[];
      text?: string;
      user: Partial<User>;
      uuid: string;
      video?: string;
    }>;

  // type MediaFile = BaseEntity & Partial<{ url: string }>;

  // type DataInterest = BaseEntity &
  //   Partial<{
  //     tag?: string;
  //     title?: string;
  //   }>;

  // type ConversationMembers = BaseEntity & {
  //   _userId: string;
  //   _conversationId: string;
  //   conversation: Conversation;
  //   user?: User;
  // };

  // type Conversation = BaseEntity &
  //   Partial<{
  //     _id: string;
  //     members: User[];
  //   }>;

  // type Message = BaseEntity &
  //   Partial<{
  //     _conversationId: string;
  //     text?: string;
  //     conversation?: Conversation;
  //   }>;
}
