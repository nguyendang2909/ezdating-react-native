import { CommonService } from 'app/commons/service.common';
import { APP_CONFIG } from 'app/config/config.app';
import { AppStore, Entity } from 'app/types';
import _ from 'lodash';
import moment from 'moment';

class LikedMeService extends CommonService {
  constructor() {
    super();
    this.staleTime = APP_CONFIG.STALE_TIME.DEFAULT;
  }

  formatMany(
    payload: Entity.Like[],
    options?: Partial<AppStore.Match>,
  ): AppStore.Match[] {
    const lastRefreshedAt = moment().toISOString();
    return payload.map(e => ({
      ...e,
      lastRefreshedAt,
      ...options,
    }));
  }

  formatOne(payload: Entity.Like): AppStore.Match {
    const { ...rest } = payload;
    return {
      ...rest,

      lastRefreshedAt: moment().toISOString(),
    };
  }

  sortAndUniq(news: AppStore.Like[], olds: AppStore.Like[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy(['createdAt'], ['desc'])
      .value();
  }

  public getCursor(data: Entity.Like[]): string | undefined {
    return this.getCursorByField('createdAt', data);
  }
}

export const likedMeService = new LikedMeService();
