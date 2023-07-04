import { Icon, IconButton } from 'native-base';
import React from 'react';
import { ActionSheetIOS } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export const ProfileSettingIconButton: React.FC = () => {
  const handlePress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Remove'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        message: 'hii',
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          /* destructive action */
        }
      },
    );
  };
  return (
    <>
      <IconButton
        onPress={handlePress}
        icon={<Icon size="2xl" as={<Feather name="settings" />} />}
      ></IconButton>
    </>
  );
};
