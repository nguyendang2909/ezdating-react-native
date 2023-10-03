import { CommonService } from 'app/commons/service.common';
import { Entity } from 'app/types/entity.type';
import { IMessage } from 'react-native-gifted-chat';

class MessagesService extends CommonService {
  formatMany(entity: Entity.Message[]): IMessage[] {
    const messages = entity.map(e => this.formatOne(e));

    return messages;
  }

  formatOne(entity: Entity.Message, options?: Partial<IMessage>): IMessage {
    const { createdAt, text, ...data } = entity;

    return {
      ...data,
      user: { _id: entity._userId || '' },
      text: text || '',
      createdAt: createdAt
        ? new Date(createdAt).getTime()
        : new Date().getTime(),
      ...options,
    };
  }
}

export const messagesService = new MessagesService();
