import {
  check as checkPermission,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request as requestPermission,
} from 'react-native-permissions';

import { OsPermissionService } from './permissions-service';

class LocationPermissionsService extends OsPermissionService {
  getPermissionType(): Permission {
    switch (this.OS) {
      case 'android':
        return PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      default:
        return PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }
  }

  async check(): Promise<PermissionStatus> {
    return await checkPermission(this.permissionType);
  }

  async request(): Promise<PermissionStatus> {
    return await requestPermission(this.permissionType);
  }
}

export const locationPermissionsService = new LocationPermissionsService();
