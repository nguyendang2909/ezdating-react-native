import { HStack, View } from '@gluestack-ui/themed';
import { CloseIconButton } from 'app/components/Button';
import { LikeIconButton } from 'app/components/Button/like-icon-button';
import { FC } from 'react';

import { SendMessageButton } from '../Button/send-message-button';

type FCProps = {
  targetUserId: string;
  onDislike: () => void;
  onSendLike: () => void;
};

export const ProfileMenuActions: FC<FCProps> = ({ onDislike, onSendLike, targetUserId }) => {
  return (
    <HStack justifyContent="center" columnGap={32}>
      <View>
        <CloseIconButton onPress={onDislike} />
      </View>
      <View>
        <SendMessageButton targetUserId={targetUserId} onClose={onDislike} />
      </View>
      <LikeIconButton onPress={onSendLike} />
    </HStack>
  );
};
