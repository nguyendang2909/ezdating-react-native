import { useAppSelector } from 'app/hooks';
import { swipeUsersApi } from 'app/services/api/swipe-users.api';
import { swipeUserActions } from 'app/store/swipe-user.store';
import { Image, View } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { TinderCard } from 'rn-tinder-card';

export const DatingSwipeSearching: React.FC = () => {
  const dispatch = useDispatch();

  const swipeUsers = useAppSelector(state => state.swipeUser.data);

  const fetchFirstTime = useCallback(async () => {
    const swipeUsersData = await swipeUsersApi.getMany();

    // if (swipeUsersData.pagination?._next === null) {
    //   setReachedEnd(true);
    // }

    if (swipeUsersData.data?.length) {
      dispatch(swipeUserActions.addMany(swipeUsersData.data));
    } else {
      // setReachedEnd(true);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchFirstTime();
  }, [fetchFirstTime]);

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
                style={{
                  width: '100%',
                  height: '100%',
                }}
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
