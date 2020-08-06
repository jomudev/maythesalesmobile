/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Header from './../../components/header';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VentasGeneral from '../../components/reportes/ventasGenerales';

const BottomTab = createMaterialBottomTabNavigator();

const ReportesContainer: () => React$Node = ({navigation}) => {
  return (
    <NavigationContainer independent={true}>
      <Header navigation={navigation} />
      <BottomTab.Navigator
        adaptive={true}
        barStyle={{backgroundColor: '#f7f8f9'}}
        activeColor="#101e5a"
        inactiveColor="#acbdd3">
        <BottomTab.Screen
          name="Reporte General"
          component={VentasGeneral}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name={'content-paste'} color={color} size={26} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default ReportesContainer;


