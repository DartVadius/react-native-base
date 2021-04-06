import React, {Component} from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export default function AppNavigator({isLoggedIn}) {
  return isLoggedIn ? <MainStack /> : <AuthStack />;
}
