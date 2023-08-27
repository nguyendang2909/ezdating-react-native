import { translate, TxKeyPath } from 'app/i18n';
import { Toast } from 'native-base';

class NotificationsService {
  success(value: TxKeyPath) {
    Toast.show({
      placement: 'top',
      description: translate('Update w successfully', {
        w: translate(value),
      }),
      title: translate('Success'),
    });
  }

  fail(value: TxKeyPath) {
    Toast.show({
      placement: 'top',
      description: translate('Update w failed!', {
        w: translate(value),
      }),
      title: translate('Fail'),
    });
  }
}

export const notificationsService = new NotificationsService();
