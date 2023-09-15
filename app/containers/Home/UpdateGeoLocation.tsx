import { usersApi } from 'app/services/api/users.api';
import React, { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';

export const UpdateGeolocation: React.FC = () => {
  useEffect(() => {
    Geolocation.getCurrentPosition(
      async position => {
        await usersApi.updateProfile({
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
  }, []);

  return <></>;
};
