import { store } from 'app/store';

import { ApiResponse } from './api-response.type';

export declare namespace AppStore {
  type RootState = ReturnType<typeof store.getState>;

  type AppState = Partial<{
    accessToken?: string;
    isLogged?: boolean;
  }>;

  type CurrentUser = Partial<{
    profile?: ApiResponse.User;
  }>;

  type Conversations = { data: ApiResponse.Conversation[] };

  type Messages = Partial<{
    [T: string]: ApiResponse.Message[];
  }>;

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
