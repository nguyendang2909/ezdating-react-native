import { useTranslate } from 'app/hooks/useFormatMessage';
import { TxKey } from 'app/types';
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
  titleTx?: TxKey;
  leftIcon?: React.ReactElement;
  value?: string;
  valueTx?: TxKey;
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
  const t = useTranslate();

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
                  <Text>{title || (!!titleTx && t(titleTx))}</Text>
                </View>
              )}

              <View flex={1}></View>

              {(!!value || !!valueTx) && (
                <View mr={2}>
                  <Text>{valueTx ? t(valueTx) : value}</Text>
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
