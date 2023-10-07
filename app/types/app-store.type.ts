import { Action } from '@reduxjs/toolkit';
import { store } from 'app/store';
import { AuthorizationResult } from 'react-native-geolocation-service';
import { IMessage } from 'react-native-gifted-chat';
import { ThunkAction } from 'redux-thunk';

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
    data: AppStore.Match[];
  };

  type Match = Entity.Match & {
    lastRefreshedAt: string;
  };

  type ChatMessage = IMessage & { uuid?: string };

  type MessageState = {
    data: Record<string, ChatMessage[] | undefined>;
    info: Record<
      string,
      {
        lastRefreshedAt?: string;
        isLoading?: boolean;
        isLoadingNewest?: boolean;
        isLoadingNext?: boolean;
        isReachedEnd?: boolean;
      }
    >;
  };

  type MatchState = {
    data: Match[];
    infoMatches: {
      lastRefreshedAt?: string;
      isLoading: boolean;
      isLoadingNewest: boolean;
      isLoadingNext: boolean;
      isReachedEnd: boolean;
    };
    infoConversations: {
      lastRefreshedAt?: string;
      isLoading: boolean;
      isLoadingNewest: boolean;
      isLoadingNext: boolean;
      isReachedEnd: boolean;
    };
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
    data: Entity.User[];
    info: {
      lastRefreshedAt?: string;
    };
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

export type AppThunkAction = ThunkAction<
  void,
  AppStore.RootState,
  unknown,
  Action
>;
