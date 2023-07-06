import { translate } from 'app/i18n';
import { Heading, View } from 'native-base';
import React from 'react';

import { BackIconButton } from '../IconButton/BackIconButton';

export const ProfileSettingHeader: React.FC = () => {
  return (
    <>
      <View height={16} justifyContent="center">
        <View zIndex={10}>
          <BackIconButton />
        </View>

        <View
          position="absolute"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Heading size="md">{translate('Settings')}</Heading>
        </View>
      </View>
    </>
  );
};
