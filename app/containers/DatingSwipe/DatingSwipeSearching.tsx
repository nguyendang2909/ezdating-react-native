import { Image } from '@gluestack-ui/themed';
import { useAppSelector } from 'app/hooks';
import { View } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TinderCard } from 'rn-tinder-card';

export const DatingSwipeSearching: React.FC = () => {
  const swipeUsers = useAppSelector(state => state.swipeUser.data);

  const width = Dimensions.get('window').width;

  return (
    <View flex={1}>
      {swipeUsers?.map((item, index) => {
        const imageUrl = item.mediaFiles?.length
          ? item.mediaFiles[0].location
          : '';

        return (
          <View
            justifyContent="center"
            alignItems="center"
            // style={styles.cardContainer}
            style={StyleSheet.absoluteFill}
            // pointerEvents="box-none"
            key={item._id || index}
          >
            <TinderCard
              cardWidth={width}
              cardHeight={(width / 640) * 860}
              // OverlayLabelRight={OverlayRight}
              // OverlayLabelLeft={OverlayLeft}
              // OverlayLabelTop={OverlayTop}
              // onSwipedRight={() => {
              //   Alert.alert('Swiped right');
              // }}
              // onSwipedTop={() => {
              //   Alert.alert('Swiped Top');
              // }}
              // onSwipedLeft={() => {
              //   Alert.alert('Swiped left');
              // }}
            >
              <Image
                w="$full"
                h="$full"
                alt={item._id}
                source={{ uri: imageUrl }}
              />
            </TinderCard>
          </View>
        );
      })}
    </View>
  );
};
