/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  FormInventario,
  Inventario,
  NuevaVenta,
} from '../../components/Inventario';
import Ventas from '../../components/Inventario/ventas';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Header from '../../components/header';

const HomeContainer: () => React$Node = ({navigation}) => {
  return (
    <NavigationContainer independent={true}>
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
          name="Agregar"
          component={FormInventario}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name={'note-add'} color={color} size={26} />
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
    </NavigationContainer>
  );
};
const Tab = createMaterialBottomTabNavigator();

export default HomeContainer;
