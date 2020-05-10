import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../../../store';
import {
  FormInventario,
  VentasDia,
  Inventario,
  NuevaVenta,
} from '../../components/Inventario';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../../components/header';

const HomeContainer: () => React$Node = ({navigation}) => {
  const user = null;

  const tabPress = e => {
    let target = e.target;
    target = target.split('-');
    target = target[0];
    store.dispatch({
      type: 'SET_TITLE',
      newTitle: target,
    });
  };

  return (
    <NavigationContainer independent={true}>
      <Header user={user} navigation={navigation} />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            // Si el tab esta seleccionado tendra un tamaño de icono de : 36px, sino sera de 26.
            size = focused ? 36 : 26;
            // Establecer icono a mostrar
            if (route.name === 'Agregar al inventario') {
              iconName = 'note-add';
            } else if (route.name === 'Ventas realizadas') {
              iconName = 'event';
            } else if (route.name === 'Inventario') {
              iconName = 'view-module';
            } else if (route.name === 'Nueva venta') {
              iconName = 'shopping-cart';
            }
            // Mostrar el icono correspondiente
            if (iconName) {
              return <Icon name={iconName} size={size} color={color} />;
            }
            return null;
          },
          tabBarLabel: ({focused, color, size}) => {
            let label = focused ? route.name : null;
            if (focused) {
              return <Text style={{fontSize: 11}}>{label}</Text>;
            } else {
              return null;
            }
          },
        })}
        adaptive={true}
        tabBarOptions={{
          activeTintColor: '#101e5a',
          inactiveTintColor: '#acbdd3',
          scrollEnabled: true,
          style: styles.tabBar,
        }}>
        <Tab.Screen
          name="Nueva venta"
          component={NuevaVenta}
          listeners={{tabPress}}
        />
        <Tab.Screen
          name="Agregar al inventario"
          component={FormInventario}
          listeners={{tabPress}}
        />
        <Tab.Screen
          name="Ventas realizadas"
          component={VentasDia}
          listeners={{tabPress}}
        />
        <Tab.Screen
          name="Inventario"
          component={Inventario}
          listeners={{tabPress}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const Tab = createBottomTabNavigator();

export default HomeContainer;

const styles = StyleSheet.create({

  tabBar: {
    padding: 5,
  },
});
