import { HStack, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useSendLikeMutation, useSendViewMutation } from 'app/api';
import { LoadingOverlay } from 'app/components';
import { APP_CONFIG } from 'app/config/config.app';
import { SCREENS } from 'app/constants';
import { useMessages, useSwipeProfiles } from 'app/hooks';
import { Profile } from 'app/types';
import _ from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import { DatingSwipeCloseButton } from './buttons/dating-swipe-close-button';
import { DatingSwipeSendLikeButton } from './buttons/dating-swipe-send-like-button';
import { ProfileInfoButton } from './buttons/profile-info-button';
import { DatingSwipeCard } from './cards';
import { DatingSwipeNoCard } from './cards/dating-swipe-no-card';

const getKeyExtractor = (card: Profile) => {
  return _.get(card, '_id', `${Math.floor(Math.random() * 10000 + 1)}`);
};

export const DatingSwipeContent: React.FC = () => {
  const { formatMessage } = useMessages();
  const navigation = useNavigation();
  const {
    data: swipeProfiles,
    length: swipeProfileLength,
    isLoading,
    fetchNext: fetchNextSwipeProfiles,
  } = useSwipeProfiles();
  const { width, height: windowHeight } = Dimensions.get('window');
  const height = (width / 640) * 860;
  const x =
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

  const handleOpenProfile = () => {
    if (swipeProfiles[cardIndex] && swipeProfiles[cardIndex]._id) {
      navigation.navigate(SCREENS.DATING_SWIPE_PROFILE, { profile: swipeProfiles[cardIndex] });
    }
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
          stackSize={5}
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

      <View position="absolute" bottom={x} left={0} right={0} zIndex={999}>
        <View>
          <HStack columnGap={32} justifyContent="center">
            <View>
              <DatingSwipeCloseButton onPress={swipeRef.current?.swipeLeft} />
            </View>
            <View>
              <ProfileInfoButton onPress={handleOpenProfile} />
            </View>
            <View>
              <DatingSwipeSendLikeButton onPress={swipeRef.current?.swipeRight} />
            </View>
          </HStack>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    bottom: 0,
    justifyContent: 'center',
    top: 0,
  },
  // eslint-disable-next-line react-native/no-color-literals
  swiper: {
    backgroundColor: '#fff',
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
