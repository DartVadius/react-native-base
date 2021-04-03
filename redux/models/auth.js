import Api from '../../api/api';
import {TokenStorage} from '../stores/tokenStorage';
import RNFS from 'react-native-fs';
// import env from 'react-native-ultimate-config';
// import {LoginManager} from 'react-native-fbsdk-next';
// import {GoogleSignin} from 'react-native-google-signin';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  /**
   *  Initial state
   */
  state: {
    isLoggedIn: false,
  },

  /**
   * Reducers
   */
  reducers: {
    setIsLoggedIn(state, value) {
      return {
        ...state,
        isLoggedIn: value,
      };
    },
  },

  /**
   * Effects/Actions
   */
  effects: dispatch => ({
    /**
     * Login
     *
     * @return {Promise}
     */
    login(payload) {
      return Api.post('oauth/token', {
        ...payload,
      })
        .then(response => response.data)
        .then(async res => {
          if (res) {
            await TokenStorage.storeToken(res.access_token);
            this.setIsLoggedIn(true);
          }
        })
        .catch(e => Promise.reject(e));
    },
    // async logout() {
    //   try {
    //     const provider = await AsyncStorage.getItem('socialProvider');
    //
    //     switch (provider) {
    //       case 'google':
    //         await GoogleSignin.signOut();
    //         break;
    //       // case 'facebook':
    //       //   LoginManager.logOut();
    //       //   break;
    //       default:
    //         break;
    //     }
    //
    //     await AsyncStorage.removeItem('socialProvider');
    //   } catch (error) {
    //     console.log(error);
    //   }
    //
    //   await TokenStorage.clear();
    //
    //   const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    //   await Promise.all(
    //     files.map(f => {
    //       RNFS.unlink(f.path);
    //     }),
    //   );
    //   await dispatch.context.unregisterFCM();
    //   await dispatch({type: 'RESET_APP'});
    //   // await dispatch.metadata.fetchLanguageCodes();
    //
    //   this.setIsLoggedIn(false);
    // },
    //
    async clearUserData() {
      await TokenStorage.clear();

      const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
      await Promise.all(
        files.map(f => {
          RNFS.unlink(f.path);
        }),
      );

      await dispatch({type: 'RESET_APP'});
    },
    //
    // setLoggedIn(value) {
    //   this.setIsLoggedIn(value);
    // },
    //
    // changePassword(payload) {
    //   return Api.put('work/1.0.0/password/', payload);
    // },
    //
    // sendRecoverySms(payload) {
    //   return Api.post(`work/1.0.0/password/phone/${payload}`);
    // },
    //
    // confirmRecoveryCode(payload) {
    //   const {phone, confirm_code} = payload;
    //
    //   return Api.patch(`work/1.0.0/password/phone/${phone}`, {
    //     confirm_code: confirm_code,
    //     nc: 'Hello there!',
    //   });
    // },
    //
    // restorePassword(payload) {
    //   return Api.post('work/1.0.0/password/reset', payload);
    // },
    //
    // recoverViaEmail(payload) {
    //   return Api.post('work/1.0.0/password/email', payload);
    // },
    //
    // addFirebaseToken() {
    //   return Api.post('work/1.0.0/profile/firebase_tokens');
    // },
    //
    // async refreshToken() {
    //   const refresh_token = await TokenStorage.getRefreshToken();
    //
    //   return await Api.post('oauth/token', {
    //     refresh_token: refresh_token,
    //     grant_type: 'refresh_token',
    //     client_id: env.CLIENT_ID,
    //     client_secret: env.CLIENT_SECRET,
    //     scope: env.SCOPE,
    //   });
    // },
  }),
};
