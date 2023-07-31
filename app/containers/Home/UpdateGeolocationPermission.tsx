import { appActions } from 'app/store/app.store';
import React, { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch } from 'react-redux';

export const UpdateGeoLocationPermission: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Geolocation.requestAuthorization('whenInUse').then(result => {
      dispatch(appActions.setOsLocationPermission(result));
    });
  });
  return <></>;
};
