import { View } from '@gluestack-ui/themed';
import { TargetUserCard } from 'app/components';
import { Like } from 'app/types';
import React, { useCallback } from 'react';

type StarFlatListItemProps = {
  data: Like;
  onPress: (like: Like) => void;
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
