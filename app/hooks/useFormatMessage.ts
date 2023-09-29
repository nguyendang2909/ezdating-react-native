import { messages } from 'app/locales/messages';
import { TxKey } from 'app/types';
import { useIntl } from 'react-intl';

export const useTranslate = () => {
  const t = useIntl();

  const formatMessage = (msg: TxKey) => t.formatMessage(messages[msg]);

  return formatMessage;
};
