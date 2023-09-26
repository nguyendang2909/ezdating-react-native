import { translate } from 'app/i18n';
import { Button } from 'native-base';
import React from 'react';

import { Header, HeaderProps } from './Header';

type FCProps = HeaderProps & {
  onSave: () => void;
  isLoading: boolean;
};

export const HeaderSaveDone: React.FC<FCProps> = ({
  onSave,
  isLoading,
  ...props
}) => {
  return (
    <Header
      RightActionComponent={
        <Button variant="unstyled" onPress={onSave} isLoading={isLoading}>
          {translate('Done')}
        </Button>
      }
      {...props}
    />
  );
};
