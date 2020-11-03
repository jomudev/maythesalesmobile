/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {AgregarCotizacion, Cotizaciones} from '../../components/cotizacion';
import Header from '../../components/header';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CotizacionContainer extends React.Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <Header navigation={this.props.navigation} />
        <Tab.Navigator
          barStyle={{backgroundColor: '#f7f8f9'}}
          activeColor="#101e5a"
          inactiveColor="#acbdd3">
          <Tab.Screen
            name="agregar"
            component={AgregarCotizacion}
            options={{
              tabBarLabel: 'Agregar',
              tabBarIcon: ({color}) => (
                <Icon name="playlist-add" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="cotizaciones"
            component={Cotizaciones}
            options={{
              tabBarLabel: 'Cotizaciones',
              tabBarIcon: ({color}) => (
                <Icon name="insert-chart" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const Tab = createMaterialBottomTabNavigator();
