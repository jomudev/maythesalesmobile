import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AgregarCotizacion from '../../components/agregarCotizacion';
import Header from '../../components/header';
import {NavigationContainer} from '@react-navigation/native';

export default class CotizacionContainer extends React.Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <Header navigation={this.props.navigation} />
        <Tab.Navigator>
          <Tab.Screen name="Agregar" component={AgregarCotizacion} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const Tab = createBottomTabNavigator();
