import { useMessages } from 'app/hooks';
import { alignItemsCenter } from 'app/styles';
import { colors, spacing } from 'app/theme';
import { TxKey } from 'app/types';
import { Box, HStack, IconButton, Text, View } from 'native-base';
import React, { FC } from 'react';

type FCProps = {
  bg?: string;
  textTx?: TxKey;
  leftIcon?: FC<{ color: string }>;
  onPressLeftIcon?: () => void;
};

export const Header: FC<FCProps> = ({
  bg,
  textTx,
  leftIcon: LeftIcon,
  onPressLeftIcon,
}) => {
  const { formatMessage } = useMessages();

  return (
    <View>
      <Box safeAreaTop backgroundColor={colors.primary} />
      <Box bg={bg || colors.primary} style={{ minHeight: spacing.xxl }}>
        <HStack>
          <HStack style={alignItemsCenter}>
            {!!LeftIcon && (
              <IconButton
                color="white"
                icon={<LeftIcon color="light" />}
                onPress={onPressLeftIcon}
              />
            )}
            {!!textTx && <Text color="light">{formatMessage(textTx)}</Text>}
          </HStack>
        </HStack>
      </Box>
    </View>
  );
};
