import { HStack, Icon, Text, View } from '@gluestack-ui/themed';
import { useMessages } from 'app/hooks';
import { TxKey } from 'app/types';
import React from 'react';

type FCProps = {
  title?: string;
  titleTx?: TxKey;
  leftIcon?: React.ReactElement;
  value?: string;
  valueTx?: TxKey;
};

export const DetailRow: React.FC<FCProps> = ({
  title,
  titleTx,
  leftIcon,
  value,
  valueTx,
}) => {
  const { formatMessage } = useMessages();

  return (
    <>
      <View px={16} py={16} backgroundColor="$backgroundLight0" rounded={16}>
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

          <View width={28}></View>

          {(!!value || !!valueTx) && (
            <View mr={8} flex={1}>
              <Text numberOfLines={1} ellipsizeMode="tail" textAlign="right">
                {valueTx ? formatMessage(valueTx) : value}
              </Text>
            </View>
          )}
        </HStack>
      </View>
    </>
  );
};
