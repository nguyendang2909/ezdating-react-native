import { useUpdateProfileMutation } from 'app/api';
import { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';

import { useAppSelector } from './useAppSelector';

export const useGeolocation = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const [longitude, latitude] = useAppSelector(s => s.app.profile.geolocation?.coordinates) || [];

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

  return {
    longitude,
    latitude,
  };
};
