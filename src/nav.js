
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/account/login/index'
import UserInfo from "./components/account/userinfo";
import Demo from './demo'


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="Demo" component={Demo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;