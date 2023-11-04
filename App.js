import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import UserInfoScreen from './src/screens/UserInfoScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserInfo" component={UserInfoScreen} />
        {/* Other screens would be added here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
