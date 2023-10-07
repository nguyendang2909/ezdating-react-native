import { CommonService } from 'app/commons/service.common';
import { APP_CONFIG } from 'app/config/config.app';
import { AppStore, Entity } from 'app/types';
import _ from 'lodash';
import moment from 'moment';

class MatchesService extends CommonService {
  constructor() {
    super();
    this.staleTime = APP_CONFIG.STALE_TIME.DEFAULT;
  }

  formatMany(
    payload: Entity.Match[],
    options?: Partial<AppStore.Match>,
  ): AppStore.Match[] {
    const lastRefreshedAt = moment().toISOString();
    return payload.map(e => ({
      ...e,
      lastRefreshedAt,
      ...options,
    }));
  }

  formatOne(
    payload: Entity.Match,
    options?: Partial<AppStore.Match>,
  ): AppStore.Match {
    return {
      ...payload,
      lastRefreshedAt: moment().toISOString(),
      ...options,
    };
  }

  sortAndUniq(news: AppStore.Match[], olds: AppStore.Match[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy(['lastMessageAt', 'createdAt'], ['desc', 'desc'])
      .value();
  }
}

export const matchesService = new MatchesService();
