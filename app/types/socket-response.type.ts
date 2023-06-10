import { ApiResponse } from './api-response.type';

export declare namespace SocketResponse {
  type Message = ApiResponse.BaseEntity & {
    _conversationId?: string;
    text?: string;
    _id: string;
  };
}
