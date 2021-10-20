/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import Inventory from '../../components/Inventario';
import NewSale from '../../components/Inventario/nuevaVenta';
import Ventas from '../../components/Inventario/ventas';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
const HomeContainer = () => {
  return (
    <Tab.Navigator tabBarOptions={screenOptions}>
      <Tab.Screen name="Nueva venta" component={NewSale} />
      <Tab.Screen name="Ventas del día" component={Ventas} />
      <Tab.Screen name="inventario" component={Inventory} />
    </Tab.Navigator>
  );
};

const screenOptions = {
  tabBarStyle: {
    elevation: 0,
  },
  tabBarIndicatorStyle: {
   backgroundColor: '#101e5a',
   height: 10,
  },
  tabBarActiveTintColor: '#101e5a',
}

export default HomeContainer;
