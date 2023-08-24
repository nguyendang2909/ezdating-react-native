import { useNavigation } from '@react-navigation/native';
import { translate } from 'app/i18n';
import { Button } from 'native-base';
import React from 'react';

import { Header, HeaderProps } from './Header';

type FCProps = HeaderProps & {
  onSave: () => void;
  isLoading: boolean;
};

export const HeaderSave: React.FC<FCProps> = ({
  onSave,
  isLoading,
  ...props
}) => {
  const { goBack } = useNavigation();

  return (
    <Header
      leftIcon="caretLeft"
      onLeftPress={goBack}
      RightActionComponent={
        <Button variant="unstyled" onPress={onSave} isLoading={isLoading}>
          {translate('Save')}
        </Button>
      }
      {...props}
    />
  );
};
