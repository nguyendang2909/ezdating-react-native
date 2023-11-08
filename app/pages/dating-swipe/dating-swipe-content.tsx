import { HStack } from '@gluestack-ui/themed';
import { useSendLikeMutation } from 'app/api';
import { useMessages, useSwipeProfiles } from 'app/hooks';
import { Profile } from 'app/types';
import _ from 'lodash';
import { View } from 'native-base';
import React, { useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import { DatingSwipeCloseButton } from './buttons/dating-swipe-close-button';
import { DatingSwipeSendLikeButton } from './buttons/dating-swipe-send-like-button';
import { DatingSwipeCard } from './cards';
import { DatingSwipeNoCard } from './cards/dating-swipe-no-card';

const getKeyExtractor = (card: Profile) => {
  return _.get(card, '_id', `${Math.floor(Math.random() * 10000 + 1)}`);
};

export const DatingSwipeContent: React.FC = () => {
  const { formatMessage } = useMessages();
  const { data: swipeProfiles, length: swipeProfileLength } = useSwipeProfiles();
  const width = Dimensions.get('window').width;
  const height = (width / 640) * 860;
  const swipeRef = useRef<Swiper<Profile>>(null);

  const [sendLike, { isLoading: isLoadingSendLike }] = useSendLikeMutation();

  const passProfile = () => {};

  const matchProfile = (cardIndex: number) => {
    if (swipeProfiles[cardIndex] && swipeProfiles[cardIndex]._id) {
      sendLike({ targetUserId: swipeProfiles[cardIndex]._id });
    }
  };

  return (
    <View flex={1}>
      <Swiper
        ref={swipeRef}
        containerStyle={styles.swiper}
        cards={swipeProfiles}
        stackSize={3}
        cardIndex={0}
        animateCardOpacity
        verticalSwipe={false}
        onSwipedLeft={passProfile}
        onSwipedRight={matchProfile}
        keyExtractor={getKeyExtractor}
        overlayLabels={{
          left: {
            title: formatMessage('NOPE'),
            style: leftLabel,
          },
          right: {
            title: formatMessage('LIKE'),
            style: rightLabel,
          },
        }}
        swipeBackCard={false}
        renderCard={(card: Profile) => {
          return card ? (
            <DatingSwipeCard width={width} height={height} key={card._id} profile={card} />
          ) : (
            <DatingSwipeNoCard />
          );
        }}
      />

      {!!swipeRef.current && !!swipeProfileLength && (
        <View flex={1} alignItems="center" justifyContent="center">
          <View height={height} width={width} justifyContent="flex-end" marginBottom={8}>
            <HStack columnGap={16} justifyContent="center">
              <View>
                <DatingSwipeCloseButton onPress={swipeRef.current.swipeLeft} />
              </View>
              <View>
                <DatingSwipeSendLikeButton onPress={swipeRef.current.swipeRight} />
              </View>
            </HStack>
          </View>
          {/* <View>
            <DatingSwipeProfileInfoButton targetProfile={targetProfile} />
          </View> */}

          {/* <DatingSwipeButtonStack swiper={swipeRef.current} />
           */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: -24,
  },
  swiper: {
    backgroundColor: 'transparent',
    // marginTop: -30,
  },
});

const leftLabel = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles, react-native/no-color-literals
  label: {
    color: 'red',
    textAlign: 'right',
  },
});

const rightLabel = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles, react-native/no-color-literals
  label: {
    color: '#4DED30',
  },
});
