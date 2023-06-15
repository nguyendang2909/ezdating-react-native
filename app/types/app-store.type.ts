import { store } from 'app/store';

import { Entity } from './entity.type';

export declare namespace AppStore {
  type RootState = ReturnType<typeof store.getState>;

  type AppState = {
    accessToken?: string;
    isLogged: boolean;
    profile: Entity.User;
  };

  type CurrentUser = Partial<{
    profile?: Entity.User;
  }>;

  type Conversations = { data: Entity.Conversation[] };

  type Messages = Partial<{
    [T: string]: Entity.Message[];
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
