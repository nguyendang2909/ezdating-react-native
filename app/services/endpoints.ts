import {
  authEndpoints,
  likeEndpoints,
  matchEndpoints,
  mediaFileEndpoints,
  meEndpoints,
  messageEndpoints,
  signedDeviceEndpoints,
  userEndpoints,
  viewEndpoints,
} from '../api';

export const endpoints = {
  ...authEndpoints,
  ...likeEndpoints,
  ...matchEndpoints,
  ...meEndpoints,
  ...mediaFileEndpoints,
  ...messageEndpoints,
  ...viewEndpoints,
  ...signedDeviceEndpoints,
  ...userEndpoints,
};
