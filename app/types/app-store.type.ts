import { Action } from '@reduxjs/toolkit';
import { store } from 'app/store';
import { AuthorizationResult } from 'react-native-geolocation-service';
import { IMessage } from 'react-native-gifted-chat';
import { ThunkAction } from 'redux-thunk';

import { Like, Match, Message, Profile, User } from './entity.type';

export declare namespace AppStore {
  type RootState = ReturnType<typeof store.getState>;

  type AppState = {
    accessToken?: string;
    refreshToken?: string;
    isLogged?: boolean;
    profile: Partial<Profile>;
    user: Partial<User>;
    osPermissions?: {
      locationService?: AuthorizationResult;
    };
    socket: {
      connectedAt?: string;
    };
  };

  type ConversationState = {
    data: AppStore.MatchData[];
  };

  type MatchData = Match & {
    lastRefreshedAt: string;
  };

  type LikeData = Like & {
    lastRefreshedAt: string;
  };

  type ChatMessage = IMessage & { uuid?: string };

  type MessageState = {
    data: Record<string, ChatMessage[] | undefined>;
    info: Record<
      string,
      {
        lastRefreshedAt?: string;
        isReachedEnd?: boolean;
      }
    >;
  };

  type MatchState = {
    data: MatchData[];
    infoMatches: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
    infoConversations: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
  };

  type Messages = Partial<{
    [T: string]: Message[];
  }>;

  type UserState = {
    swipe?: {
      data?: User[];
    };
    data?: Record<string, User>;
  };

  type NearbyState = {
    data: Profile[];
    info: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
  };

  type SwipeProfileState = {
    data: Profile[];
    info: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
  };

  type LikesState = {
    data?: Like[];
  };

  type LikedMeState = {
    data: LikeData[];
    info: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
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

export type AppThunkAction = ThunkAction<void, AppStore.RootState, unknown, Action>;
