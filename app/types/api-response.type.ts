import { Entity } from './entity.type';

export declare namespace ApiResponse {
  type FetchData<T = any, R extends Record<string, any> = {}> = {
    [P in keyof R]?: R[P];
  } & {
    data?: T;
    type?: string;
  };

  type UserData = FetchData<Entity.User>;

  type Logged = FetchData<{ accessToken: string; user: Entity.User }>;
}
