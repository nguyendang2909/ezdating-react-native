import { translate, TxKeyPath } from 'app/i18n';
import {
  ChevronRightIcon,
  HStack,
  Icon,
  Pressable,
  Text,
  View,
} from 'native-base';
import React from 'react';

type FCProps = {
  title?: string;
  titleTx?: TxKeyPath;
  leftIcon?: React.ReactElement;
  value?: string;
  valueTx?: TxKeyPath;
  onPress?: () => void;
};

export const MenuItem: React.FC<FCProps> = ({
  leftIcon,
  title,
  titleTx,
  value,
  valueTx,
  onPress,
}) => {
  return (
    <Pressable
      {...(onPress
        ? {
            onPress: () => {
              onPress();
            },
          }
        : {})}
    >
      {({ isPressed }) => {
        return (
          <View px={4} py={4} bg={isPressed ? 'coolGray.200' : undefined}>
            <HStack alignItems="center">
              {!!leftIcon && (
                <View mr={2}>
                  <Icon as={leftIcon} />
                </View>
              )}

              {(!!title || !!titleTx) && (
                <View>
                  <Text>{title || (!!titleTx && translate(titleTx))}</Text>
                </View>
              )}

              <View flex={1}></View>

              {(!!value || !!valueTx) && (
                <View mr={2}>
                  <Text>{valueTx ? translate(valueTx) : value}</Text>
                </View>
              )}

              <View>
                <ChevronRightIcon />
              </View>
            </HStack>
          </View>
        );
      }}
    </Pressable>
  );
};
