import { CommonService } from 'app/commons/service.common';
import { Entity } from 'app/types/entity.type';
import _ from 'lodash';

class ConversationsService extends CommonService {
  sortAndUniq(news: Entity.Match[], olds: Entity.Match[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy('_id', 'desc')
      .value();
  }
}

export const conversationsService = new ConversationsService();
