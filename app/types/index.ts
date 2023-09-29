import { messages } from 'app/locales/messages';

export type Message = typeof messages;

export type TxKey = keyof Message;

export type TxKeyValue = Message[TxKey];
