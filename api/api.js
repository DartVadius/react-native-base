import axios from 'axios';
import {TokenStorage} from '../redux/stores/tokenStorage';
import env from 'react-native-ultimate-config';

const Api = (() => {
  return axios.create({
    baseURL: env.API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 20000,
  });
})();

Api.interceptors.request.use(config => {
  if (config.url === 'login' || config.url === 'register') {
    return config;
  }

  return TokenStorage.getToken().then(token => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
});

export default Api;
