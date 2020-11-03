/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Login from './src/components/auth/login';
import Signin from './src/components/auth/signIn';
import DrawerNavigator from './src/components/drawer';
import {View, ActivityIndicator, StatusBar} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(undefined);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const authUnsubscriber = auth().onAuthStateChanged(authUser => {
      setUser(authUser);
      setInitializing(false);
    });
    return () => {
      authUnsubscriber;
    };
  });

  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgb(242, 242, 242)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <StatusBar backgroundColor="rgb(242,242,242)" barStyle="dark-content" />
        <ActivityIndicator size={40} color="#101e5a" />
      </View>
    );
  }

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="drawerNavigator" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#000000ff"
      />
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signin" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
// PENDIENTES AGREGAR
// <Drawer.Screen name="Cotizaciones" component={Cotizacion} />
