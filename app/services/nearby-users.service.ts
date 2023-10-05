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
}

export const nearbyUsersService = new NearbyUsersService();
