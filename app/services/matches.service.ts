import { CommonService } from 'app/commons/service.common';
import { AppStore } from 'app/types';
import _ from 'lodash';
import { IMessage } from 'react-native-gifted-chat';

class MessagesService extends CommonService {
  sortAndUniq(news: IMessage[], olds: IMessage[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy('_id', 'desc')
      .value();
  }

  isOld(match: AppStore.Match) {}
}

export const messagesService = new MessagesService();
