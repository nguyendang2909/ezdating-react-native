import { CommonService } from 'app/commons/service.common';
import { APP_CONFIG } from 'app/config/config.app';
import { AppStore, Entity } from 'app/types';
import _ from 'lodash';
import moment from 'moment';

class ConversationsService extends CommonService {
  constructor() {
    super();
    this.staleTime = APP_CONFIG.STALE_TIME.DEFAULT;
  }

  formatMany(payload: Entity.Match[], options?: Partial<AppStore.Match>): AppStore.Match[] {
    const lastRefreshedAt = moment().toISOString();
    return payload.map(e => ({
      ...e,
      lastRefreshedAt,
      ...options,
    }));
  }

  formatOne(payload: Entity.Match): AppStore.Match {
    return {
      ...payload,
      lastRefreshedAt: moment().toISOString(),
    };
  }

  sortAndUniq(news: AppStore.Match[], olds: AppStore.Match[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy(['lastMessageAt', 'createdAt'], ['desc', 'desc'])
      .value();
  }

  public getCursor(data: Entity.Match[]): string | undefined {
    const dataLength = data.length;
    if (!dataLength) {
      return undefined;
    }
    const lastData = data[dataLength - 1];
    const lastField = lastData.lastMessage?._id;
    return lastField ? this.encodeFromString(lastField) : undefined;
  }
}

export const conversationsService = new ConversationsService();
