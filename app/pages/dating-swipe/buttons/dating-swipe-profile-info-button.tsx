import { Box, Icon, InfoIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { ButtonIcon } from 'app/components/Button';
import { SCREENS } from 'app/constants';
import { Profile } from 'app/types';
import React from 'react';

type DatingSwipeCloseButtonProps = {
  targetProfile: Profile;
};

export const DatingSwipeProfileInfoButton: React.FC<DatingSwipeCloseButtonProps> = ({
  targetProfile,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(SCREENS.DATING_SWIPE_PROFILE, {
      profile: targetProfile,
    });
  };

  return (
    <Box>
      <ButtonIcon height={48} width={48} backgroundColor="$black" onPress={handlePress}>
        <Icon color="$white" height={24} width={24} as={InfoIcon} />
      </ButtonIcon>
    </Box>
  );
};
