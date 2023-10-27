import { CommonService } from 'app/commons/service.common';
import { APP_CONFIG } from 'app/config/config.app';
import { AppStore, Match } from 'app/types';
import _ from 'lodash';
import moment from 'moment';

class ConversationsService extends CommonService {
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

  formatOne(payload: Match, currentUserId: string): AppStore.MatchData {
    const { profileOne, profileTwo, ...rest } = payload;
    return {
      ...rest,
      ...(profileOne?._id === currentUserId
        ? {
            targetProfile: profileTwo,
          }
        : {
            targetProfile: profileOne,
          }),
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
