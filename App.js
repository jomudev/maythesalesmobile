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
import firestore from '@react-native-firebase/firestore';
import store from './store';
import Login from './src/components/auth/login';
import Signin from './src/components/auth/signIn';
import DrawerNavigator from './src/components/drawer';
import {View, ActivityIndicator, StatusBar} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [newUserData, setNewUserData] = useState(null);
  const [user, setUser] = useState(undefined);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const storeUnsubscriber = store.subscribe(() => {
      const state = store.getState();
      if (state.newUserData !== newUserData) {
        setNewUserData(state.newUserData);
      }
      if (state.user !== user) {
        setUser(state.user);
      }
      if (state.isNewUser !== isNewUser) {
        setIsNewUser(state.isNewUser);
      }
    });

    const unsubscriber = auth().onAuthStateChanged(authUser => {
      setTimeout(() => {
        setInitializing(false);
      }, 2500);
      if (authUser) {
        firestore()
          .doc(`users/${authUser.uid}`)
          .get()
          .then(doc => {
            const userData = doc.data();
            store.dispatch({
              type: 'SET_USER',
              user: authUser,
              userData,
            });
          });
      } else {
        store.dispatch({type: 'SIGNOUT'});
      }
    });
    return () => {
      unsubscriber;
      storeUnsubscriber;
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
    isNewUser
      ? firestore()
          .doc(`users/${user.uid}`)
          .set({
            nombres: newUserData.nombres,
            apellidos: newUserData.apellidos,
            email: newUserData.email,
            negocio: newUserData.negocio,
          })
          .then(() => {
            store.dispatch({
              type: 'SET_IS_NEW_USER',
              data: false,
            });
          })
      : null;
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
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="signin" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
// PENDIENTES AGREGAR
// <Drawer.Screen name="Cotizaciones" component={Cotizacion} />
