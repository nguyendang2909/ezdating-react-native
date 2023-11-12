import { useUpdateProfileMutation } from 'app/api';
import React, { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';

export const UpdateGeolocation: React.FC = () => {
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async position => {
        await updateProfile({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        }).unwrap();
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, [updateProfile]);

  return <></>;
};
