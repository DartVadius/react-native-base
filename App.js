import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Root from './Screens/Root';
import {PersistGate} from 'redux-persist/integration/react';
import store from './redux/index';
import DropdownAlert from 'react-native-dropdownalert';
import {DropDownHolder} from './common/DropDownHolder';
import {getPersistor} from '@rematch/persist';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import LoginScreen from './Screens/LoginScreen';

const persistor = getPersistor();
function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}
const Stack = createStackNavigator();
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={LoginScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
      <DropdownAlert
        ref={ref => DropDownHolder.setDropDown(ref)}
        closeInterval={6000}
      />
    </>
  );
}
export default App;
