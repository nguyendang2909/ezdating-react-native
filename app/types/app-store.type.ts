import { store } from 'app/store';
import { AuthorizationResult } from 'react-native-geolocation-service';

import { ApiResponse } from './api-response.type';
import { Entity } from './entity.type';

export declare namespace AppStore {
  type RootState = ReturnType<typeof store.getState>;

  type AppState = {
    accessToken?: string;
    refreshToken?: string;
    isLogged?: boolean;
    profile?: Entity.User;
    osPermissions?: {
      locationService?: AuthorizationResult;
    };
  };

  type ConversationState = {
    data?: Entity.Match[];
    messages?: Record<
      string,
      {
        pagination?: ApiResponse.Pagination;
        data?: Entity.Message[];
      }
    >;
    pagination?: ApiResponse.Pagination;
  };

  type MatchState = {
    data?: Entity.Match[];
    pagination?: ApiResponse.Pagination;
  };

  type Messages = Partial<{
    [T: string]: Entity.Message[];
  }>;

  type UserState = {
    swipe?: {
      data?: Entity.User[];
    };
    data?: Record<string, Entity.User>;
    nearby?: {
      data?: Entity.User[];
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
