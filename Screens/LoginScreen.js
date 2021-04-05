import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class LoginScreen extends Component {
  render() {
    console.log(22);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Login Screen</Text>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
