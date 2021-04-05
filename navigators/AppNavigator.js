import React, {Component} from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import HomeScreen from '../Screens/HomeScreen';
import CardsScreen from '../Screens/CardsScreen';
import {connect} from 'react-redux';

class AppNavigator extends Component {
  render() {
    const {isLoggedIn} = this.props;
    return <>{isLoggedIn ? <MainStack /> : <AuthStack />}</>;
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  setLoggedIn: dispatch.auth.setLoggedIn,
  logout: dispatch.auth.logout,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
