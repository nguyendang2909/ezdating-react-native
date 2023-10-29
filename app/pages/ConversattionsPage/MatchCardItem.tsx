import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { CacheImage, LinearGradient } from 'app/components';
import { height, width } from 'app/styles';
import { Match } from 'app/types';
import _ from 'lodash';
import { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';

type MatchCardItemProps = {
  match: Match;
  width: number;
  height: number;
  onPress: (e: string) => void;
};

export const MatchCardItem: FC<MatchCardItemProps> = ({
  match,
  width: widthValue,
  height: heightValue,
  onPress,
}) => {
  const handlePress = useCallback(() => {
    onPress(match._id);
  }, [match._id, onPress]);

  const url = _.get(match, 'targetProfile.mediaFiles[0].key');
  console.log(url);
  return (
    <Pressable p={1} width={widthValue} onPress={handlePress}>
      <Box>
        <CacheImage
          style={[styles.image, height(heightValue), width(widthValue)]}
          url={_.get(match, 'targetProfile.mediaFiles[0].key')}
        ></CacheImage>
        <LinearGradient
          position="absolute"
          colors={['#fd267a', '#ff6036']}
          height={heightValue}
          width={widthValue}
          borderRadius={8}
        />
      </Box>
      <Box>
        <Text fontWeight="bold" numberOfLines={1}>
          {match.targetProfile?.nickname}
        </Text>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    zIndex: 10,
  },
});
