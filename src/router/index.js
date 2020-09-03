import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Login, Home, FaceRecognition, Splash, UserLocation} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
      })}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="UserLocation" component={UserLocation} />
    </Stack.Navigator>
  );
};

export default Router;
