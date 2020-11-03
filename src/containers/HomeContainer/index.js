/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Inventario from '../../components/Inventario';
import NuevaVenta from '../../components/Inventario/nuevaVenta';
import Ventas from '../../components/Inventario/ventas';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Header from '../../components/header';
import {StatusBar} from 'react-native';

const HomeContainer = ({navigation}) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <Header navigation={navigation} />
      <Tab.Navigator
        adaptive={true}
        barStyle={{backgroundColor: '#f7f8f9'}}
        activeColor="#101e5a"
        inactiveColor="#acbdd3">
        <Tab.Screen
          name="Nueva venta"
          component={NuevaVenta}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name={'shopping-cart'} color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Ventas"
          component={Ventas}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name={'event'} color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="inventario"
          component={Inventario}
          options={{
            tabBarLabel: 'Inventario',
            tabBarIcon: ({color}) => (
              <Icon name={'view-module'} color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
const Tab = createMaterialBottomTabNavigator();

export default HomeContainer;
