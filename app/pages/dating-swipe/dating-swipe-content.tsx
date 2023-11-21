import { View } from '@gluestack-ui/themed';
import { useSendLikeMutation, useSendViewMutation } from 'app/api';
import { LoadingOverlay } from 'app/components';
import { APP_CONFIG } from 'app/config/config.app';
import { useMessages, useSwipeProfiles } from 'app/hooks';
import { Profile } from 'app/types';
import _ from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import { DatingSwipeCard } from './cards';
import { DatingSwipeNoCard } from './cards/dating-swipe-no-card';
import { DatingSwipeMenuActions } from './menu/dating-swipe-menu-actions';

const getKeyExtractor = (card: Profile) => {
  return _.get(card, '_id', `${Math.floor(Math.random() * 10000 + 1)}`);
};

export const DatingSwipeContent: React.FC = () => {
  const { formatMessage } = useMessages();
  const {
    data: swipeProfiles,
    length: swipeProfileLength,
    isLoading,
    fetchNext: fetchNextSwipeProfiles,
  } = useSwipeProfiles();
  const { width, height: windowHeight } = Dimensions.get('window');
  const height = (width / 640) * 860;
  const spaceX =
    (windowHeight - APP_CONFIG.SIZE.TOP_BAR.HEIGHT - APP_CONFIG.SIZE.BOTTOM_BAR.HEIGHT - height) /
    2;
  const swipeRef = useRef<Swiper<Profile>>(null);

  const [sendLike] = useSendLikeMutation();
  const [sendView] = useSendViewMutation();
  const [cardIndex, setCardIndex] = useState<number>(0);

  const swipeProfileId = swipeProfiles[cardIndex]?._id;

  useEffect(() => {
    if (swipeProfileId) {
      sendView({ targetUserId: swipeProfileId });
    }
  }, [cardIndex, sendView, swipeProfileId]);

  const passProfile = () => {
    setCardIndex(prev => prev + 1);
    fetchNextSwipeProfilesIfNeeded();
  };

  const matchProfile = (cardIndex: number) => {
    setCardIndex(prev => prev + 1);
    if (swipeProfiles[cardIndex] && swipeProfiles[cardIndex]._id) {
      sendLike({ targetUserId: swipeProfiles[cardIndex]._id });
    }
    fetchNextSwipeProfilesIfNeeded();
  };

  const overlayLabels = useMemo(
    () => ({
      left: {
        title: formatMessage('NOPE'),
        style: leftLabel,
      },
      right: {
        title: formatMessage('LIKE'),
        style: rightLabel,
      },
    }),
    [formatMessage],
  );

  const fetchNextSwipeProfilesIfNeeded = () => {
    if (cardIndex >= swipeProfileLength - 15) {
      fetchNextSwipeProfiles();
    }
  };

  return (
    <>
      <View flex={1} zIndex={1} alignItems="center" justifyContent="center">
        <Swiper
          ref={swipeRef}
          containerStyle={styles.swiper}
          cards={swipeProfiles}
          stackSize={2}
          // cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={passProfile}
          onSwipedRight={matchProfile}
          keyExtractor={getKeyExtractor}
          cardStyle={styles.card}
          overlayLabels={overlayLabels}
          swipeBackCard={false}
          showSecondCard={swipeProfileLength > 0}
          renderCard={(card: Profile) => {
            return card ? (
              <DatingSwipeCard width={width} height={height} key={card._id} profile={card} />
            ) : isLoading ? (
              <LoadingOverlay />
            ) : (
              <DatingSwipeNoCard />
            );
          }}
        ></Swiper>
      </View>

      <View position="absolute" bottom={spaceX} left={0} right={0} zIndex={999}>
        <View>
          <DatingSwipeMenuActions
            currentSwipeRef={swipeRef.current}
            profile={swipeProfiles[cardIndex]}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    // bottom: 0,
    // justifyContent: 'center',
    // top: 0,
  },
  // eslint-disable-next-line react-native/no-color-literals
  swiper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
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
