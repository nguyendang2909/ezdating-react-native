import { CommonService } from 'app/commons/service.common';
import { AppStore, Message } from 'app/types';
import _ from 'lodash';
import { IMessage } from 'react-native-gifted-chat';

class MessagesService extends CommonService {
  formatMany(entity: Message[]): IMessage[] {
    const messages = entity.map(e => this.formatOne(e));

    return messages;
  }

  formatOne(entity: Message, options?: Partial<IMessage>): IMessage {
    const { createdAt, text, ...data } = entity;

    return {
      ...data,
      user: { _id: entity._userId || '' },
      text: text || '',
      createdAt: createdAt ? new Date(createdAt).getTime() : new Date().getTime(),
      ...options,
    };
  }

  sortAndUniq(news: IMessage[], olds: IMessage[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy('_id', 'desc')
      .value();
  }

  public getCursor(data: AppStore.ChatMessage[]): string | undefined {
    return this.getCursorByField('createdAt', data);
  }
}

export const messagesService = new MessagesService();
