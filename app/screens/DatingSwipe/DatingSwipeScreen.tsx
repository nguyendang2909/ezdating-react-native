import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components';
import { UpdateGeolocation } from 'app/containers/Home/UpdateGeoLocation';
import { DatingSwipeWrapper } from 'app/pages/dating-swipe';
// import { UpdateGeolocation } from 'app/containers/Home/UpdateGeolocation';
import { colors } from 'app/theme';
import { Box } from 'native-base';
import React, { FC } from 'react';

export const DatingSwipeScreen: FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header
        titleTx="AppName"
        rightIcon="settings"
        onRightPress={() => {
          navigation.navigate('EditMatchFilter');
        }}
      />
      <UpdateGeolocation />
      <Box flex={1} safeAreaY backgroundColor={colors.primary}>
        {/* <TouchableOpacity>
          <Box
            bg={{
              linearGradient: {
                colors: ['#fd267a', '#ff6036'],
                start: [0, 1],
                end: [1, 1],
              },
            }}
            p="12"
            rounded="lg"
            _text={{ fontSize: 'md', fontWeight: 'bold', color: 'white' }}
          >
            <Text>This is a Box with Linear Gradient</Text>
          </Box>
        </TouchableOpacity>

        <LinearGradient
          colors={['#FF00FF', '#FFF000', '#FF0000']}
          style={{ borderRadius: 20, width: 100 / 3 }}
          start={{ y: 0.0, x: 0.0 }}
          end={{ y: 0.0, x: 1.0 }}
        >
          <Box height={100}></Box>
        </LinearGradient> */}

        {/* <GradientIcon icon={FontAwesome} name="heart" /> */}
        <DatingSwipeWrapper />
      </Box>
    </>
  );
};
