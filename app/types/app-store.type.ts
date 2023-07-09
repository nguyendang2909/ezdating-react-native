import { store } from 'app/store';
import { IMessage } from 'react-native-gifted-chat';

import { ApiResponse } from './api-response.type';
import { Entity } from './entity.type';

export declare namespace AppStore {
  type RootState = ReturnType<typeof store.getState>;

  type AppState = {
    accessToken?: string;
    refreshToken?: string;
    isLogged: boolean;
    profile: Entity.User;
  };

  type MessageState = Omit<IMessage, 'createdAt'> &
    Omit<Entity.Message, 'id'> & { id?: string };

  type ConversationState = {
    data: Record<string, Entity.Relationship>;
    messages: Record<
      string,
      {
        pagination?: ApiResponse.Pagination;
        data: MessageState[];
      }
    >;
    pagination: ApiResponse.Pagination;
  };

  type Conversations = { data: Entity.Relationship[] };

  type Messages = Partial<{
    [T: string]: Entity.Message[];
  }>;

  type UserState = {
    data: Record<string, Entity.User>;
  };

  type PhotoActionType = 'delete' | 'create' | undefined;

  type PhotoAction = {
    type?: PhotoActionType;
    _id?: string;
  };

  type Settings = {
    photo: {
      action: PhotoAction;
    };
  };
}
