/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar, useWindowDimensions} from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeContainer from './src/containers/HomeContainer';
import CotizacionContainer from './src/containers/CotizacionContainer';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import store from './store';

let productsList = [];
let providersList = [];
let clientsList = [];
let servicesList = [];

// Establecer inventario
firestore()
  .collection('productos')
  .onSnapshot(snap => {
    if (!snap.empty) {
      snap.docChanges().forEach(change => {
        const data = change.doc.data();
        if (change.type === 'added') {
          productsList = productsList.concat(data);
        }
      });
      store.dispatch({
        type: 'SET_INVENTORY',
        products: productsList,
      });
    }
  });
firestore()
  .collection('clientes')
  .onSnapshot(snap => {
    if (!snap.empty) {
      snap.docChanges().forEach(change => {
        const data = change.doc.data();
        if (change.type === 'added') {
          clientsList = clientsList.concat(data);
        }
      });
      store.dispatch({
        type: 'SET_INVENTORY',
        clients: clientsList,
      });
    }
  });
firestore()
  .collection('proveedores')
  .onSnapshot(snap => {
    if (!snap.empty) {
      snap.docChanges().forEach(change => {
        const data = change.doc.data();
        if (change.type === 'added') {
          providersList = providersList.concat(data);
        }
      });
      store.dispatch({
        type: 'SET_INVENTORY',
        providers: providersList,
      });
    }
  });
firestore()
  .collection('servicios_adicionales')
  .onSnapshot(snap => {
    if (!snap.empty) {
      snap.docChanges().forEach(change => {
        const data = change.doc.data();
        if (change.type === 'added') {
          servicesList = servicesList.concat(data);
        }
      });
      store.dispatch({
        type: 'SET_INVENTORY',
        services: servicesList,
      });
    }
  });

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
        edgeWidth={useWindowDimensions().width}
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

            return <Icon name={name} color={color} size={size} />;
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
