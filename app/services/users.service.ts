import { CommonService } from 'app/commons/service.common';
import { Entity } from 'app/types/entity.type';

class UsersService extends CommonService {
  getIdsWithSameLastDistance(users: Entity.User[]): string[] {
    const usersLength = users.length;

    if (!usersLength) {
      return [];
    }

    const lastId = users[usersLength - 1]._id;

    const result = [lastId];

    if (usersLength === 1) {
      return result;
    }

    const lastDistance = users[usersLength - 1].distance;

    for (let i = usersLength - 2; i >= 0; i -= 1) {
      const distance = users[i].distance;

      if (distance !== lastDistance) {
        break;
      }

      result.push(users[i]._id);
    }

    return result;
  }
}

export const usersService = new UsersService();
