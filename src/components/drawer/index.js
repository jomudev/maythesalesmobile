/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './drawerContent';
import HomeContainer from '../../containers/HomeContainer';
//import CotizacionContainer from './src/containers/CotizacionContainer';
import ReportesContainer from '../../containers/ReportesContainer';
import CamScanner from '../CamScanner';
import store from '../../../store';

const DrawerApp = createDrawerNavigator();

const DrawerNavigator = () => {
  const user = store.getState().user;
  return (
    <DrawerApp.Navigator
      edgeWidth={50}
      initialRouteName="Inicio"
      drawerContent={({navigation}) => (
        <DrawerContent user={user} navigation={navigation} />
      )}
      drawerStyle={{width: '65%'}}
      drawerType="front">
      <DrawerApp.Screen name="Inicio" component={HomeContainer} />
      <DrawerApp.Screen name="Reportes" component={ReportesContainer} />
      <DrawerApp.Screen name="CamScanner" component={CamScanner} />
    </DrawerApp.Navigator>
  );
};

export default DrawerNavigator;
