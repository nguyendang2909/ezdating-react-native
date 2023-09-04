import { useAppSelector } from 'app/hooks';
import { api } from 'app/services/api';
import { userActions } from 'app/store/user.store';
import { Image, View } from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { TinderCard } from 'rn-tinder-card';

export const DatingSwipeSearching: React.FC = () => {
  const dispatch = useDispatch();

  const swipeUsersQuery = api.useGetSwipeUsersQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
    },
  );

  const swipeUsers = useAppSelector(state => state.user.swipe?.data);

  const fetchFirstTime = async () => {
    if (!swipeUsers?.length) {
      if (swipeUsersQuery.data?.data?.length) {
        dispatch(userActions.addSwipeUsers(swipeUsersQuery.data.data));
      }

      const refetchUsers = await swipeUsersQuery.refetch();

      if (refetchUsers.data?.data) {
        dispatch(userActions.addSwipeUsers(refetchUsers.data.data));
      }
    }
  };

  useEffect(() => {
    fetchFirstTime();
  }, []);

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
