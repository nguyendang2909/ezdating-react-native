import { View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { TargetUserCard } from 'app/components';
import { Entity } from 'app/types';
import React from 'react';

type StarFlatListItemProps = {
  data: Entity.Like;
};

export const StarFlatListItem: React.FC<StarFlatListItemProps> = ({ data }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (!data.user) {
      return;
    }
    navigation.navigate('LikedMeProfile', {
      user: data.user,
    });
  };

  return (
    <View px={4} py={4} w="$1/2">
      <TargetUserCard targetUser={data.user} onPress={handlePress} />
    </View>
  );
};
