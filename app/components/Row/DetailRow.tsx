import { Box, Text, View } from '@gluestack-ui/themed';
import { useMessages } from 'app/hooks';
import { TxKey } from 'app/types';
import React from 'react';

import { GradientIcon, GradientIconProps } from '../Icon/GradientIcon';

type FCProps = {
  title?: string;
  titleTx?: TxKey;
  leftIcon?: GradientIconProps;
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
      <View
        px={16}
        py={16}
        backgroundColor="$backgroundLight0"
        rounded={16}
        flex={1}
      >
        <Box flexDirection="row" alignItems="center">
          {!!leftIcon && (
            <View mr={8}>
              <GradientIcon size={20} {...leftIcon} />
            </View>
          )}

          {(!!title || !!titleTx) && (
            <View>
              <Text numberOfLines={1} ellipsizeMode="tail" textAlign="left">
                {title || (!!titleTx && formatMessage(titleTx))}
              </Text>
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
        </Box>
      </View>
    </>
  );
};
