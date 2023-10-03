import { messages } from 'app/locales/messages';
import { TxKey } from 'app/types';
import axios from 'axios';
import { useIntl } from 'react-intl';

export const getMessageFromResponse = (
  error: unknown,
): (typeof messages)[TxKey] => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message as TxKey;

    if (message && messages[message]) {
      return messages[message];
    }
  }

  return messages['Internal server error'];
};

export const useMessages = () => {
  const intl = useIntl();

  const translate = (value: TxKey): string => {
    return intl.formatMessage(messages[value]);
  };

  const translateErrorResponse = (error: unknown) => {
    return intl.formatMessage(getMessageFromResponse(error));
  };

  return {
    translate,
    translateErrorResponse,
  };
};
