import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Root from './Screens/Root';
import {PersistGate} from 'redux-persist/integration/react';
import store from './redux/index';
import DropdownAlert from 'react-native-dropdownalert';
import {DropDownHolder} from './common/DropDownHolder';
import {getPersistor} from '@rematch/persist';

const persistor = getPersistor();

export default class App extends Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Root />
          </PersistGate>
        </Provider>
        <DropdownAlert
          ref={ref => DropDownHolder.setDropDown(ref)}
          closeInterval={6000}
        />
      </>
    );
  }
}
