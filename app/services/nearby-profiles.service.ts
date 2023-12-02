import { CommonService } from 'app/commons/service.common';
import { Entity } from 'app/types';
import _ from 'lodash';

class NearbyProfilesService extends CommonService {
  sortAndUniq(news: Entity.Profile[], olds: Entity.Profile[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy('distance', 'asc')
      .value();
  }

  public getCursor(profiles: Entity.Profile[]): string | undefined {
    if (!profiles.length) {
      return undefined;
    }
    const distance = profiles[profiles.length - 1].distance;
    return this.encodeFromString(`${distance}`);
  }
}

export const nearbyProfilesService = new NearbyProfilesService();
