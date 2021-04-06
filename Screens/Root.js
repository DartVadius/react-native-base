import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import AppNavigator from '../navigators/AppNavigator';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

class Root extends Component {
  render() {
    const {isLoggedIn} = this.props;
    console.log(123, isLoggedIn);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NavigationContainer>
          <AppNavigator isLoggedIn={isLoggedIn} />
        </NavigationContainer>
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Root);
