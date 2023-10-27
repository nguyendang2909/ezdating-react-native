import { View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { TargetUserCard } from 'app/components';
import { Like } from 'app/types';
import React from 'react';

type StarFlatListItemProps = {
  data: Like;
};

export const StarFlatListItem: React.FC<StarFlatListItemProps> = ({ data }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (!data.profile) {
      return;
    }
    navigation.navigate('LikedMeProfile', {
      profile: data.profile,
    });
  };

  return (
    <View px={4} py={4} w="$1/2">
      <TargetUserCard targetUser={data.profile} onPress={handlePress} />
    </View>
  );
};
