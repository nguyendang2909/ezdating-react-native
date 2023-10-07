import { formatMessage } from 'app/locales/locale';
import Toast from 'react-native-toast-message';

class NotificationsService {
  updateSuccess() {
    Toast.show({
      text1: formatMessage('Update successfully.'),
    });
  }

  updateFail() {
    Toast.show({
      text1: formatMessage('Update failed, please try again.'),
      type: 'error',
    });
  }
}

export const notificationsService = new NotificationsService();
