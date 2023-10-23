import { messages } from 'app/locales/messages';
import { TxKey } from 'app/types';
import _ from 'lodash';
import { useIntl } from 'react-intl';

export const getMessageFromResponse = (
  error: unknown,
  defaultMessage?: TxKey,
): (typeof messages)[TxKey] => {
  const message: TxKey = _.get(error, 'data.message') || defaultMessage || 'Internal server error';
  return messages[message];
};

export const useMessages = () => {
  const intl = useIntl();

  const formatMessage = (value: TxKey): string => {
    return intl.formatMessage(messages[value]);
  };

  const formatErrorMessage = (error: unknown, defaultMessage?: TxKey) => {
    return intl.formatMessage(getMessageFromResponse(error, defaultMessage));
  };

  return {
    formatMessage,
    formatErrorMessage,
  };
};
