import { api } from 'app/services/api';
import React, { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';

export const UpdateGeoLocation: React.FC = () => {
  const [submitUpdateProfile] = api.useUpdateProfileMutation();

  useEffect(() => {
    Geolocation.requestAuthorization('whenInUse').then(result => {
      if (result === 'denied') {
        console.log('denide');
      } else if (result === 'granted') {
        Geolocation.getCurrentPosition(
          async position => {
            await submitUpdateProfile({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            });
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
  });
  return <></>;
};
