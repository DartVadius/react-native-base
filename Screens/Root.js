import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainStack from '../navigators/MainStack';
import AuthStack from '../navigators/AuthStack';

class Root extends Component {
  render() {
    const {isLoggedIn} = this.props;

    return isLoggedIn ? <MainStack /> : <AuthStack />;
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
