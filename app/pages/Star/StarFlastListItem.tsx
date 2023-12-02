import { View } from '@gluestack-ui/themed';
import { TargetUserCard } from 'app/components';
import { Entity } from 'app/types';
import React, { useCallback } from 'react';

type StarFlatListItemProps = {
  data: Entity.View;
  onPress: (like: Entity.View) => void;
};

export const StarFlatListItem: React.FC<StarFlatListItemProps> = ({ data, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(data);
  }, [data, onPress]);

  return (
    <View px={4} py={4} w="$1/2">
      <TargetUserCard targetUser={data.profile} onPress={handlePress} />
    </View>
  );
};
