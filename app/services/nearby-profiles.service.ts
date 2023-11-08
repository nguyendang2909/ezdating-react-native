import { CommonService } from 'app/commons/service.common';
import { Profile } from 'app/types';
import _ from 'lodash';

class NearbyProfilesService extends CommonService {
  sortAndUniq(news: Profile[], olds: Profile[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy('distance', 'asc')
      .value();
  }

  public getCursor(profiles: Profile[]): string | undefined {
    if (!profiles.length) {
      return undefined;
    }
    const distance = profiles[profiles.length - 1].distance;
    return this.encodeFromString(`${distance}`);
  }
}

export const nearbyProfilesService = new NearbyProfilesService();
