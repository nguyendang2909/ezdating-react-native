import { useAppSelector } from 'app/hooks';
import React from 'react';

import { DatingSwipeSearching } from './DatingSwipeSearching';
import { RequireEnalbeLocationSharing } from './RequireEnableLocationSharing';

export const DatingSwipe: React.FC = () => {
  const locationServicePermission = useAppSelector(
    state => state.app.osPermissions.locationService,
  );

  if (locationServicePermission) {
    if (locationServicePermission === 'granted') {
      return (
        <>
          <DatingSwipeSearching />
        </>
      );
    }

    if (
      ['disabled', 'granted', 'denied', 'restricted'].includes(
        locationServicePermission,
      )
    ) {
      return <RequireEnalbeLocationSharing />;
    }
  }

  return <></>;
};
