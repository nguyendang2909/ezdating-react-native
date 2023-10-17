import { CommonService } from 'app/commons/service.common';
import { DevicePlatforms } from 'app/constants';
import { Platform } from 'react-native';

class SignedDevicesService extends CommonService {
  getDevicePlatform() {
    const os = Platform.OS;
    if (os === 'ios') {
      return DevicePlatforms.ios;
    }
    if (os === 'android') {
      return DevicePlatforms.android;
    }
    return DevicePlatforms.other;
  }
}

export const signedDevicesService = new SignedDevicesService();
