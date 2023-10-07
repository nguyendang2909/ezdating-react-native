import { messages } from 'app/locales/messages';

export * from './api-request.type';
export * from './api-response.type';
export * from './app-store.type';
export * from './common.type';
export * from './configs.type';
export * from './entity.type';
export * from './form-params.type';
export * from './socket-request.type';
export * from './socket-response.type';

export type Message = typeof messages;

export type TxKey = keyof Message;

export type TxKeyValue = Message[TxKey];

export type ChatUser = {
  _id: string;
  name?: string;
  avatar?: string;
};
