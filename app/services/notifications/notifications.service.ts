import { translate } from 'app/i18n';
import { TxKey } from 'app/types';
import { Toast } from 'native-base';

class NotificationsService {
  success(value: TxKey) {
    Toast.show({
      placement: 'top',
      description: translate('Update w successfully', {
        w: translate(value),
      }),
      title: translate('Success'),
    });
  }

  fail(value: TxKey) {
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
