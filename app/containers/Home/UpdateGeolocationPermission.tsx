import { appActions } from 'app/store/app.store';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS } from 'react-native-permissions';
import { useDispatch } from 'react-redux';

export const UpdateGeoLocationPermission: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    switch (Platform.OS) {
      case 'ios':
        Geolocation.requestAuthorization('whenInUse').then(result => {
          dispatch(appActions.setOsLocationPermission(result));
        });
        break;
      case 'android':
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
          console.log(result);
        });
        break;
    }
  }, [dispatch]);

  return <></>;
};
