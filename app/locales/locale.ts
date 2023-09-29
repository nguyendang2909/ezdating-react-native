import * as Localization from 'expo-localization';

const locale = Localization.locale;

export const [language, region] = locale.split('-');

export const isRTL = Localization.isRTL;
