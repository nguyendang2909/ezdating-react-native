import messaging from '@react-native-firebase/messaging';
import { useUpdateSignedDeviceMutation } from 'app/api';
import { useAppSelector } from 'app/hooks';
import { signedDevicesService } from 'app/services/signed-devices.service';
import React, { useCallback, useEffect } from 'react';

export const RequestNotificationPermission: React.FC = () => {
  const [updateSignedDevice] = useUpdateSignedDeviceMutation();
  const refreshToken = useAppSelector(state => state.app.refreshToken);

  const request = useCallback(async () => {
    if (!refreshToken) {
      return;
    }
    const authorizationStatus = await messaging().requestPermission();
    if (
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      const deviceToken = await messaging().getToken();
      await updateSignedDevice({
        devicePlatform: signedDevicesService.getDevicePlatform(),
        refreshToken,
        deviceToken,
      }).unwrap();
    }
  }, [refreshToken, updateSignedDevice]);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    request();
  }, [request]);
  return <></>;
};
