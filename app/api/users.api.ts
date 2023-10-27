import { api } from './api';

const usersApi = api.injectEndpoints({
  endpoints: _builder => ({}),
});

export const { endpoints: userEndpoints } = usersApi;
