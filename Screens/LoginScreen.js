import React, {Component, PureComponent} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

class LoginScreen extends PureComponent {
  render() {
    console.log(22);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Login Screen</Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
