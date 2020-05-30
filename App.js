/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {StatusBar, Text} from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeContainer from './src/containers/HomeContainer';
import CotizacionContainer from './src/containers/CotizacionContainer';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import store from './store';

const Home = ({navigation}) => {
  return <HomeContainer navigation={navigation} />;
};

const Cotizacion = ({navigation}) => {
  return <CotizacionContainer navigation={navigation} />;
};

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#101e5a" />
      <Drawer.Navigator
        drawerType="back"
        edgeWidth={100}
        screenOptions={({route}) => ({
          drawerIcon: ({focused, color, size}) => {
            color = focused ? '#101e5a' : '#acbdd3';
            let name = '';
            if (route.name === 'Inicio') {
              name = 'home';
            }
            if (route.name === 'Cotizaciones') {
              name = 'assignment';
            }

            return <Icon name={name} color={color} size={size} />
          },
        })}>
        <Drawer.Screen name="Inicio" component={Home} />
        <Drawer.Screen name="Cotizaciones" component={Cotizacion} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const Drawer = createDrawerNavigator();

export default App;
