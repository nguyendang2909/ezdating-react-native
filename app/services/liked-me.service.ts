import { CommonService } from 'app/commons/service.common';
import { APP_CONFIG } from 'app/config/config.app';
import { AppStore, Like } from 'app/types';
import _ from 'lodash';
import moment from 'moment';

class LikedMeService extends CommonService {
  constructor() {
    super();
    this.staleTime = APP_CONFIG.STALE_TIME.DEFAULT;
  }

  formatMany(payload: Like[], options?: Partial<AppStore.LikeData>): AppStore.LikeData[] {
    const lastRefreshedAt = moment().toISOString();
    return payload.map(e => ({
      ...e,
      lastRefreshedAt,
      ...options,
    }));
  }

  formatOne(payload: Like): AppStore.LikeData {
    const { ...rest } = payload;
    return {
      ...rest,

      lastRefreshedAt: moment().toISOString(),
    };
  }

  sortAndUniq(news: AppStore.LikeData[], olds: AppStore.LikeData[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy(['createdAt'], ['desc'])
      .value();
  }

  public getCursor(data: Like[]): string | undefined {
    return this.getCursorByField('createdAt', data);
  }
}

export const likedMeService = new LikedMeService();
