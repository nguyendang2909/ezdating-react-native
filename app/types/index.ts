import { messages } from 'app/locales/messages';

export type Message = typeof messages;

export type TxKey = keyof Message;

export type TxKeyValue = Message[TxKey];

export type ChatUser = {
  _id: string;
  name?: string;
  avatar?: string;
};
