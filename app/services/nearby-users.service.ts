import { CommonService } from 'app/commons/service.common';
import { Entity } from 'app/types/entity.type';
import _ from 'lodash';

class NearbyUsersService extends CommonService {
  sortAndUniq(news: Entity.User[], olds: Entity.User[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy(['distance', '_id'], ['asc', 'asc'])
      .value();
  }

  public getCursor(users: Entity.User[]): string | undefined {
    if (!users.length) {
      return undefined;
    }
    const minDistance = users[users.length - 1].distance;
    const excludedUserIds = users.filter(e => e.distance === minDistance).map(e => e._id);
    const cursor = {
      minDistance,
      excludedUserIds,
    };

    return this.encodeFromObj(cursor);
  }
}

export const nearbyUsersService = new NearbyUsersService();
