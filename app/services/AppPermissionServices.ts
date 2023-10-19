import Geolocation, { AuthorizationResult } from 'react-native-geolocation-service';

class Service {
  async requestGeolocation(): Promise<AuthorizationResult> {
    return await Geolocation.requestAuthorization('whenInUse');
  }
}

export const AppPermissionsService = new Service();
