import { CommonService } from 'app/commons/service.common';
import { APP_CONFIG } from 'app/config/config.app';
import { AppStore, Match } from 'app/types';
import _ from 'lodash';
import moment from 'moment';

class MatchesService extends CommonService {
  constructor() {
    super();
    this.staleTime = APP_CONFIG.STALE_TIME.DEFAULT;
  }

  formatMany(payload: Match[], options?: Partial<AppStore.MatchData>): AppStore.MatchData[] {
    const lastRefreshedAt = moment().toISOString();
    return payload.map(e => ({
      ...e,
      lastRefreshedAt,
      ...options,
    }));
  }

  formatOne(payload: Match): AppStore.MatchData {
    return {
      ...payload,
      lastRefreshedAt: moment().toISOString(),
    };
  }

  sortAndUniq(news: AppStore.MatchData[], olds: AppStore.MatchData[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy(['lastMessageAt', 'createdAt'], ['desc', 'desc'])
      .value();
  }

  public getCursor(data: Match[]): string | undefined {
    return this.getCursorByField(['createdAt'], data);
  }
}

export const matchesService = new MatchesService();
