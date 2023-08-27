import { Header } from 'app/components';
import { GradientIcon } from 'app/components/Icon/GradientIcon';
import { FontAwesome } from 'app/components/Icon/Lib';
import { DatingSwipe } from 'app/containers/DatingSwipe/DatingSwipe';
import { UpdateGeolocation } from 'app/containers/Home/UpdateGeolocation';
import { colors } from 'app/theme';
import { Box, Text } from 'native-base';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export const DatingSwipeScreen: FC = () => {
  return (
    <>
      <Header titleTx="appName" />
      <UpdateGeolocation />
      <Box flex={1} safeAreaY backgroundColor={colors.primary}>
        <TouchableOpacity>
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
          {/* <Button
            style={{
              borderRadius: 20,
              width: 100 / 3,
              textAlign: 'center',
              color: '#fff',
            }}
            title={`Welcome`}
          /> */}
        </LinearGradient>

        <GradientIcon icon={FontAwesome} name="heart" />
        <DatingSwipe />
      </Box>
    </>
  );
};
