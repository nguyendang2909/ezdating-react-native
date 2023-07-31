import { api } from 'app/services/api';
import React, { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';

export const UpdateGeolocation: React.FC = () => {
  const [submitUpdateProfile] = api.useUpdateProfileMutation();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async position => {
        console.log(11111, position.coords.longitude, position.coords.latitude);

        await submitUpdateProfile({
          longitude: -122,
          latitude: 38,
        }).unwrap();
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  return <></>;
};
