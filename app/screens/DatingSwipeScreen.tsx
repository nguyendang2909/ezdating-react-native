import { Header } from 'app/components';
import { DatingSwipe } from 'app/containers/DatingSwipe/DatingSwipe';
import { UpdateGeolocation } from 'app/containers/Home/UpdateGeolocation';
import { UpdateGeoLocationPermission } from 'app/containers/Home/UpdateGeolocationPermission';
import { colors } from 'app/theme';
import { Box, Button, Pressable, Text } from 'native-base';
import React, { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';

export const DatingSwipeScreen: FC = () => {
  return (
    <>
      <Header titleTx="appName" />
      <UpdateGeoLocationPermission />
      <UpdateGeolocation />
      <Box flex={1} safeAreaY backgroundColor={colors.primary}>
        <Pressable>
          <Box
            bg={{
              linearGradient: {
                colors: ['lightBlue.300', 'violet.800'],
                start: [1, 0],
                end: [1, 1],
              },
            }}
            p="12"
            rounded="lg"
            _text={{ fontSize: 'md', fontWeight: 'bold', color: 'white' }}
          >
            <Text>This is a Box with Linear Gradient</Text>
          </Box>
        </Pressable>

        <LinearGradient
          colors={['#FF00FF', '#FFF000', '#FF0000']}
          style={{ borderRadius: 20, width: 100 / 3 }}
          start={{ y: 0.0, x: 0.0 }}
          end={{ y: 0.0, x: 1.0 }}
        >
          <Button
            style={{
              borderRadius: 20,
              width: 100 / 3,
              textAlign: 'center',
              color: '#fff',
            }}
            title={`Welcome`}
          />
        </LinearGradient>
        <DatingSwipe />
      </Box>
    </>
  );
};
