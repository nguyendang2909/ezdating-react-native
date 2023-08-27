import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { I18nManager } from 'react-native';

import ar from './ar';
// if English isn't your default language, move Translations to the appropriate language file.
import en, { Translations } from './en';
import ko from './ko';

i18n.fallbacks = true;
/**
 * we need always include "*-US" for some valid language codes because when you change the system language,
 * the language code is the suffixed with "-US". i.e. if a device is set to English ("en"),
 * if you change to another language and then return to English language code is now "en-US".
 */
i18n.translations = { ar, en, 'en-US': en, ko };

i18n.locale = Localization.locale;

// handle RTL languages
export const isRTL = Localization.isRTL;
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? // eslint-disable-next-line no-use-before-define
    Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>;

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];
