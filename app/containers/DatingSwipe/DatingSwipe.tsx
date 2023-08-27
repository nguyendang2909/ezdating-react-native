import { locationPermissionsService } from 'app/services/location-permissions.service';
import React, { useEffect, useState } from 'react';
import { PermissionStatus, RESULTS } from 'react-native-permissions';

import { DatingSwipeSearching } from './DatingSwipeSearching';
import { RequireEnalbeLocationSharing } from './RequireEnableLocationSharing';

export const DatingSwipe: React.FC = () => {
  const [permission, setPermission] = useState<PermissionStatus | null>(null);

  const handlePermission = async () => {
    const currentPermission = await locationPermissionsService.check();

    if (
      currentPermission === 'blocked' ||
      currentPermission === 'unavailable'
    ) {
      setPermission(currentPermission);
      return;
    }

    const newPermission = await locationPermissionsService.request();

    setPermission(newPermission);
  };

  useEffect(() => {
    handlePermission();
  }, []);

  if (permission) {
    if (permission === 'granted') {
      return (
        <>
          <DatingSwipeSearching />
        </>
      );
    }

    if (
      [
        RESULTS.BLOCKED,
        RESULTS.DENIED,
        RESULTS.UNAVAILABLE,
        RESULTS.LIMITED,
      ].includes(permission)
    ) {
      return <RequireEnalbeLocationSharing onChange={setPermission} />;
    }
  }

  return <></>;
};
