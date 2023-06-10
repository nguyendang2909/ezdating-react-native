import {
  EDrinking,
  EEducationLevel,
  EGender,
  ELookingForGender,
  ESmoking,
  EWorkout,
} from './enums';

export declare namespace ApiResponse {
  type FetchData<T = any, R extends Record<string, any> = {}> = {
    [P in keyof R]?: R[P];
  } & {
    data?: T;
    type?: string;
  };

  type UserData = FetchData<User>;

  type Logged = FetchData<{ accessToken: string; user: User }>;

  type BaseEntity = {
    _id?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    isActive?: boolean;
  };

  type IsExistUser = FetchData<{ phoneNumber?: string; exist: boolean }>;

  type MediaFile = BaseEntity & Partial<{ url: string }>;

  type User = BaseEntity &
    Partial<{
      _interestIds: string[];
      _photoIds: string[];
      about: string;
      age?: number;
      avatar: MediaFile;
      birthdate: string;
      company: string;
      drinking: EDrinking;
      educationLevel: EEducationLevel;
      email: string;
      fullname: string;
      gallery: MediaFile[];
      interests: DataInterest[];
      location: string;
      gender: EGender;
      jobTitle: string;
      lookingForGender: ELookingForGender;
      nickname: string;
      haveBasicInfo: boolean;
      password: string;
      phoneNumber: string;
      role: string;
      school: string;
      smoking: ESmoking;
      workout: EWorkout;
    }>;

  type DataInterest = BaseEntity &
    Partial<{
      tag?: string;
      title?: string;
    }>;

  type ConversationMembers = BaseEntity & {
    _userId: string;
    _conversationId: string;
    conversation: Conversation;
    user?: User;
  };

  type Conversation = BaseEntity &
    Partial<{
      _id: string;
      members: User[];
    }>;

  type Message = BaseEntity &
    Partial<{
      _conversationId: string;
      text?: string;
      conversation?: Conversation;
    }>;
}
