import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import CardsScreen from '../Screens/CardsScreen';
import {Component} from 'react';
import {connect} from 'react-redux';
import LoginScreen from '../Screens/LoginScreen';

const AuthStackNavigator = createStackNavigator();

class AuthStack extends Component {
  render() {
    return (
      <AuthStackNavigator.Navigator initialRouteName="Login">
        <AuthStackNavigator.Screen name="Login" component={LoginScreen} />
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
