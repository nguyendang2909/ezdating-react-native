import {
  authEndpoints,
  likeEndpoints,
  matchEndpoints,
  messageEndpoints,
  userEndpoints,
} from '../api';

export const endpoints = {
  ...authEndpoints,
  ...likeEndpoints,
  ...matchEndpoints,

  ...messageEndpoints,

  ...userEndpoints,
};
