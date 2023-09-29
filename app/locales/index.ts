import { MessageFormatElement } from 'react-intl';

export const translators: Record<
  string,
  Record<string, string> | Record<string, MessageFormatElement[]>
> = {
  en: require('./en.json'),
};
