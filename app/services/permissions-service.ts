import { Platform } from 'react-native';
import { Permission, PermissionStatus } from 'react-native-permissions';

export class OsPermissionService {
  OS = Platform.OS;
  permissionType: Permission = this.getPermissionType();

  getPermissionType(): Permission {
    throw new Error('Not implemented exception');
  }

  async check(): Promise<PermissionStatus> {
    throw new Error('Not implemented exception');
  }

  async request(): Promise<PermissionStatus> {
    throw new Error('Not implemented exception');
  }
}
