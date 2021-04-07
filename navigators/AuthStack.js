import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Component} from 'react';
import {connect} from 'react-redux';
import LoginScreen from '../Screens/LoginScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';

const AuthStackNavigator = createStackNavigator();

class AuthStack extends Component {
  render() {
    return (
      <AuthStackNavigator.Navigator initialRouteName="login">
        <AuthStackNavigator.Screen name="login" component={LoginScreen} />
        <AuthStackNavigator.Screen
          name="registration"
          component={RegistrationScreen}
        />
      </AuthStackNavigator.Navigator>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  setLoggedIn: dispatch.auth.setLoggedIn,
  logout: dispatch.auth.logout,
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthStack);
