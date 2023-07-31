import { translate } from 'app/i18n';
import { AppPermissionsService } from 'app/services/AppPermissionServices';
import { appActions } from 'app/store/app.store';
import { Button, Text, View } from 'native-base';
import React from 'react';
import { Linking } from 'react-native';
import { useDispatch } from 'react-redux';

export const RequireEnalbeLocationSharing: React.FC = () => {
  const dispatch = useDispatch();

  const handlePress = async () => {
    const permission = await AppPermissionsService.requestGeolocation();
    if (permission !== 'granted') {
      Linking.openSettings();
    }
    if (permission === 'granted') {
      dispatch(appActions.setOsLocationPermission(permission));
    }
  };

  return (
    <View flex={1} justifyContent="center">
      <View alignItems="center" px={4}>
        <Text fontSize="lg">Unable to connect</Text>
      </View>

      <View mt={5} alignItems="center" px={4}>
        <Text textAlign="center">
          To use EZ Dating, you need to enable your location sharing so we can
          show you who&apos;s around.
        </Text>
      </View>

      <View mt={5} alignItems="center" px={4}>
        <Text textAlign="center">
          Go to Settings {'>'} EZDating {'>'} Location {'>'} Enable Location
          While Using the App
        </Text>
      </View>

      <View mt={7} alignItems="center" px={4}>
        <Button w="full" onPress={handlePress}>
          {translate('Open Settings')}
        </Button>
      </View>
    </View>
  );
};
