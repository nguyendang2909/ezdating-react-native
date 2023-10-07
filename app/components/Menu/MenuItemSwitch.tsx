import { useMessages } from 'app/hooks';
import { TxKey } from 'app/types';
import { HStack, Icon, Switch, Text, View } from 'native-base';
import React from 'react';

type FCProps = {
  title?: string;
  titleTx?: TxKey;
  leftIcon?: React.ReactElement;
  value?: boolean;
  onToggle?: (value: boolean) => void;
};

export const MenuItemSwitch: React.FC<FCProps> = ({
  leftIcon,
  title,
  titleTx,
  value,
  onToggle,
}) => {
  const { formatMessage } = useMessages();

  return (
    <View px={4} py={2}>
      <HStack alignItems="center">
        {!!leftIcon && (
          <View mr={2}>
            <Icon as={leftIcon} />
          </View>
        )}

        {(!!title || !!titleTx) && (
          <View>
            <Text>{title || (!!titleTx && formatMessage(titleTx))}</Text>
          </View>
        )}

        <View flex={1}></View>

        <View>
          <Switch size="sm" value={value} onToggle={onToggle} />
        </View>
      </HStack>
    </View>
  );
};
