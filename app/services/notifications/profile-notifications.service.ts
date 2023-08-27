import { notificationsService } from './notifications.service';

class ProfileNotificationsService {
  success() {
    notificationsService.success('profile');
  }

  fail() {
    notificationsService.fail('profile');
  }
}

export const profileNotificationsService = new ProfileNotificationsService();
