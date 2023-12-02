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

  formatMany(payload: Entity.View[], options?: Partial<AppStore.View>): AppStore.View[] {
    const lastRefreshedAt = moment().toISOString();
    return payload.map(e => ({
      ...e,
      lastRefreshedAt,
      ...options,
    }));
  }

  formatOne(payload: Entity.View): AppStore.View {
    const { ...rest } = payload;
    return {
      ...rest,
      lastRefreshedAt: moment().toISOString(),
    };
  }

  sortAndUniq(news: AppStore.View[], olds: AppStore.View[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy(['createdAt'], ['desc'])
      .value();
  }

  public getCursor(data: Entity.View[]): string | undefined {
    return this.getCursorByField('createdAt', data);
  }
}

export const likedMeService = new LikedMeService();
