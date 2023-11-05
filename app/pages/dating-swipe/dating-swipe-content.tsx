import { useAppSelector } from 'app/hooks';
import { Profile } from 'app/types';
import { View } from 'native-base';
import React, { useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import { DatingSwipeCard } from './cards';
import { DatingSwipeNoCard } from './cards/dating-swipe-no-card';

export const DatingSwipeContent: React.FC = () => {
  const swipeUsers = useAppSelector(state => state.nearbyUser.data);
  const width = Dimensions.get('window').width;
  const height = (width / 640) * 860;
  const swipeRef = useRef<Swiper<any>>(null);

  const passProfile = () => {};

  const matchProfile = () => {};

  return (
    <View style={{ height: '100%' }}>
      <Swiper
        ref={swipeRef}
        containerStyle={styles.swiper}
        cards={swipeUsers}
        stackSize={5}
        cardIndex={0}
        animateCardOpacity
        verticalSwipe={false}
        onSwipedLeft={passProfile}
        onSwipedRight={matchProfile}
        overlayLabels={{
          left: {
            title: 'NOPE',
            style: leftLabel,
          },
          right: {
            title: 'LIKE',
            style: rightLabel,
          },
        }}
        renderCard={(card: Profile) =>
          card ? (
            <DatingSwipeCard width={width} height={height} key={card._id} profile={card} />
          ) : (
            <DatingSwipeNoCard />
          )
        }
      />
    </View>
  );

  // return (
  //   <View style={styles.wrapper}>
  //     {swipeUsers.map((profile, index) => {
  //       const imageUrl = _.get(profile, 'mediaFiles[0].key');
  //       return (
  //         <View style={styles.cardContainer} pointerEvents="box-none" key={profile._id}>
  //           <TinderCard
  //             cardWidth={width}
  //             cardHeight={height}
  //             OverlayLabelRight={OverlayRight}
  //             OverlayLabelLeft={OverlayLeft}
  //             OverlayLabelTop={OverlayTop}
  //             cardStyle={styles.card}
  //             onSwipedRight={() => {
  //               Alert.alert('Swiped right');
  //             }}
  //             onSwipedTop={() => {
  //               Alert.alert('Swiped Top');
  //             }}
  //             onSwipedLeft={() => {
  //               Alert.alert('Swiped left');
  //             }}
  //           >
  //             <LinearGradient
  //               zIndex={100}
  //               height="$full"
  //               width="$full"
  //               position="absolute"
  //               borderRadius={8}
  //               colors={['#00000000', '#00000000', '#00000000', '#000000']}
  //               justifyContent="flex-end"
  //             >
  //               <Box px={16} py={16}>
  //                 <HStack columnGap={8}>
  //                   {!!profile.nickname && (
  //                     <Text
  //                       fontSize={28}
  //                       fontWeight="bold"
  //                       color="$white"
  //                       numberOfLines={1}
  //                       lineHeight={28}
  //                       textShadowColor="rgba(0, 0, 0, 0.75)"
  //                       textShadowOffset={{ width: -1, height: 1 }}
  //                       textShadowRadius={2}
  //                     >
  //                       {profile.nickname}
  //                     </Text>
  //                   )}
  //                   {!!profile.birthday && (
  //                     <AgeText
  //                       birthday={profile.birthday}
  //                       hideAge={profile.hideAge}
  //                       fontSize={28}
  //                       color="$white"
  //                       numberOfLines={1}
  //                       lineHeight={28}
  //                       textShadowColor="rgba(0, 0, 0, 0.75)"
  //                       textShadowOffset={{ width: -1, height: 1 }}
  //                       textShadowRadius={2}
  //                     />
  //                   )}
  //                 </HStack>

  //                 {!_.isUndefined(profile.distance) && (
  //                   <DistanceText
  //                     distance={profile.distance}
  //                     fontSize={22}
  //                     color="$white"
  //                     numberOfLines={1}
  //                     lineHeight={28}
  //                     textShadowColor="rgba(0, 0, 0, 0.75)"
  //                     textShadowOffset={{ width: -1, height: 1 }}
  //                     textShadowRadius={2}
  //                   />
  //                 )}
  //                 {!!profile.introduce && (
  //                   <Text
  //                     color="$white"
  //                     numberOfLines={5}
  //                     textShadowColor="rgba(0, 0, 0, 0.75)"
  //                     textShadowOffset={{ width: -1, height: 1 }}
  //                     textShadowRadius={2}
  //                   >
  //                     {profile.introduce}
  //                   </Text>
  //                 )}
  //                 <View>
  //                   <DatingSwipeButtonStack targetUserId={profile._id} />
  //                 </View>
  //               </Box>
  //             </LinearGradient>
  //             <CacheImage url={imageUrl} style={styles.image} />
  //           </TinderCard>
  //         </View>
  //       );
  //     })}
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -24,
  },
  swiper: {
    backgroundColor: 'transparent',
  },
});

const leftLabel = StyleSheet.create({
  label: {
    color: 'red',
    textAlign: 'right',
  },
});

const rightLabel = StyleSheet.create({
  label: {
    color: '#4DED30',
  },
});
