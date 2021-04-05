import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import CardsScreen from '../Screens/CardsScreen';
import {Component} from 'react';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

class MainStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cards" component={CardsScreen} />
      </Stack.Navigator>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainStack);
