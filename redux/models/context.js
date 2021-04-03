import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DropDownHolder} from '../../common/DropDownHolder';
import UserAgent from 'react-native-user-agent';

export default {
  /**
   *  Initial state
   */
  state: {
    company: {
      role: null,
    },
    project: null,
  },

  /**
   * Reducers
   */
  reducers: {
    updateCompany(state, data) {
      return {...state, company: data};
    },

    updateProject(state, data) {
      return {...state, project: data};
    },

    increaseProjectLimit(state, val) {
      let data = state.company;
      data.projects_limit += val;
      return {...state, company: data};
    },
  },

  /**
   * Effects/Actions
   */
  effects: dispatch => ({
    /**
     * Get getEvents
     *
     * @return {Promise}
     */

    async fetchInitialData() {
      await dispatch.context
        .configureFCM()
        .catch(e => console.log('configureFCM', e));
      // try {
      // await dispatch.company
      //   .fetchCompanies()
      //   .catch(e => console.log('fetchCompanies', e));
      // await dispatch.event
      //   .fetchEvents()
      //   .catch(e => console.log('fetchEvents', e));
      // await dispatch.metadata
      //   .fetchTimezones()
      //   .catch(e => console.log('fetchTimezones', e));
    },

    async configureFCM() {
      const authStatus = await messaging().hasPermission();

      if (authStatus !== messaging.AuthorizationStatus.AUTHORIZED) {
        await messaging().requestPermission();
      }

      const fcmToken = await messaging().getToken();

      const savedToken = await AsyncStorage.getItem('fcmToken');

      if (fcmToken !== savedToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }

      const userAgent = await UserAgent.getUserAgent();
      await dispatch.user.setFirebaseToken({
        token: fcmToken,
        useragent: userAgent,
      });

      messaging().onTokenRefresh(async newToken => {
        await dispatch.user.setFirebaseToken({
          token: newToken,
          useragent: userAgent,
        });
      });

      messaging().onMessage(async remoteMessage => {
        // Foreground handler.
        const title = remoteMessage.notification.title;
        const body = remoteMessage.notification.body;
        DropDownHolder.dropDown.alertWithType(
          'info',
          i18n.t(title),
          i18n.t(body),
          {},
          5000,
        );
      });

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        // Push arrives automatically.
        console.log('Message handled in the background!', remoteMessage);
      });
    },
    async unregisterFCM() {
      if (messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().unregisterDeviceForRemoteMessages();
      }

      await AsyncStorage.removeItem('fcmToken');
    },
  }),
};
