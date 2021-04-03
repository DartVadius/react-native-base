import AsyncStorage from '@react-native-async-storage/async-storage';
const Lock = require('lock').Lock;

export class TokenStorage {
  static lock = Lock();

  static LOCAL_STORAGE_TOKEN = 'token';

  static cachedToken = null;

  static async storeToken(token) {
    await AsyncStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
  }

  static async clear() {
    this.cachedToken = null;
    await AsyncStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
  }

  static getToken() {
    return new Promise((resolve, reject) => {
      this.lock('cache', unlockFn => {
        const unlock = unlockFn();

        if (this.cachedToken !== null) {
          unlock();
          resolve(this.cachedToken);
          return;
        }

        return AsyncStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN)
          .then(token => {
            unlock();
            this.cachedToken = token;
            resolve(token);
          })
          .catch(e => {
            unlock();
          });
      });
    });
  }
}
