import {init} from '@rematch/core';
import selectPlugin from '@rematch/select';
import persistPlugin from '@rematch/persist';
import createLoadingPlugin from '@rematch/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as models from './models';

// Create plugins
// const persistPlugin = createRematchPersist({
//   version: 2,
//   storage,
//   key: 'root',
//   blacklist: ['company', 'shift'],
// });
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const loadingPlugin = createLoadingPlugin({});

const store = init({
  models,
  plugins: [persistPlugin(persistConfig), loadingPlugin, selectPlugin()],
  redux: {
    rootReducers: {
      RESET_APP: (state, action) => undefined,
    },
  },
});

export default store;
