import {
  EDrinking,
  EEducationLevel,
  EGender,
  ELookingForGender,
  ESmoking,
  EWorkout,
} from './enums';

export declare namespace Entity {
  type BaseEntity = {
    id?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type User = BaseEntity &
    Partial<{
      introduce: string;
      age?: number;
      avatar?: MediaFile;
      birthday?: string;
      company?: string;
      drinking?: EDrinking;
      educationLevel?: EEducationLevel;
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

  type MediaFile = BaseEntity & Partial<{ url: string }>;

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
