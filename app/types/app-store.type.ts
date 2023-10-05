import { store } from 'app/store';
import { AuthorizationResult } from 'react-native-geolocation-service';
import { IMessage } from 'react-native-gifted-chat';

import { Entity } from './entity.type';

export declare namespace AppStore {
  type RootState = ReturnType<typeof store.getState>;

  type AppState = {
    accessToken?: string;
    refreshToken?: string;
    isLogged?: boolean;
    profile: Partial<Entity.User>;
    osPermissions?: {
      locationService?: AuthorizationResult;
    };
    socket: {
      connectedAt?: string;
    };
  };

  type ConversationState = {
    data: Entity.Match[];
    info: {
      lastRefreshedAt?: string;
    };
  };

  type Match = Entity.Match & {
    lastRefreshedAt?: string;
  };

  type ChatMessage = IMessage & { uuid?: string };

  type MessageState = {
    data: Record<string, ChatMessage[] | undefined>;
    info: Record<
      string,
      {
        lastRefreshedAt?: string;
      }
    >;
  };

  type MatchState = {
    data?: Entity.Match[];
    isReachedEnd?: boolean;
  };

  type Messages = Partial<{
    [T: string]: Entity.Message[];
  }>;

  type UserState = {
    swipe?: {
      data?: Entity.User[];
    };
    data?: Record<string, Entity.User>;
  };

  type NearbyState = {
    data?: Entity.User[];
    isRefreshingTop?: boolean;
    isRefreshingBottom?: boolean;
    isReachedEnd?: boolean;
  };

  type SwipeUserState = {
    data?: Entity.User[];
  };

  type LikesState = {
    data?: Entity.Like[];
  };

  type LikedMeState = {
    data?: Entity.Like[];
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
