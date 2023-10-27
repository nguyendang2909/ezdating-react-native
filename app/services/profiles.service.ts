import { CommonService } from 'app/commons/service.common';
import { Profile } from 'app/types';

class ProfilesService extends CommonService {
  getIdsWithSameLastDistance(profiles: Profile[]): string[] {
    const length = profiles.length;
    if (!length) {
      return [];
    }
    const lastId = profiles[length - 1]._id;
    const result = [lastId];
    if (length === 1) {
      return result;
    }
    const lastDistance = profiles[length - 1].distance;
    for (let i = length - 2; i >= 0; i -= 1) {
      const distance = profiles[i].distance;
      if (distance !== lastDistance) {
        break;
      }
      result.push(profiles[i]._id);
    }
    return result;
  }
}

export const profilesService = new ProfilesService();
