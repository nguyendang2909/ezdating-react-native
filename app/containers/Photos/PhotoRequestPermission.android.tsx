import React, { useEffect } from 'react';
import { Permission, PermissionsAndroid } from 'react-native';

const AndroidCheckAndRequestPermission = async (permission: Permission) => {
  const havePermission = PermissionsAndroid.check(permission);
  if (!havePermission) {
    PermissionsAndroid.request(permission);
  }
};

export const PhotoRequestPermission: React.FC = () => {
  useEffect(() => {
    AndroidCheckAndRequestPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    AndroidCheckAndRequestPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    AndroidCheckAndRequestPermission(PermissionsAndroid.PERMISSIONS.CAMERA);
  }, []);

  return <></>;
};
