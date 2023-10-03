import { TxKey } from 'app/types';
import * as Localization from 'expo-localization';
import { createIntl, createIntlCache } from 'react-intl';

import { translators } from '.';
import { messages } from './messages';

const locale = Localization.locale;

export const [language, region] = locale.split('-');

export const isRTL = Localization.isRTL;

const cache = createIntlCache();

const intl = createIntl(
  {
    locale,
    messages: translators[language] || translators.en,
  },
  cache,
);

const { formatMessage } = intl;

export const translate = (e: TxKey) => {
  return formatMessage(messages[e]);
};
