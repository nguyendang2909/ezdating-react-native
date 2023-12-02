import { CommonService } from 'app/commons/service.common';
import { Entity } from 'app/types';
import _ from 'lodash';

class SwipeProfilesService extends CommonService {
  sortAndUniq(news: Entity.Profile[], olds: Entity.Profile[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy(['distance', '_id'], ['asc', 'asc'])
      .value();
  }

  public getCursor(profiles: Entity.Profile[]): string | undefined {
    if (!profiles.length) {
      return undefined;
    }
    const minDistance = profiles[profiles.length - 1].distance;
    const excludedUserIds = profiles.filter(e => e.distance === minDistance).map(e => e._id);
    const cursor = {
      minDistance,
      excludedUserIds,
    };
    return this.encodeFromObj(cursor);
  }
}

export const swipeProfilesService = new SwipeProfilesService();
