import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './draweContent';
import HomeContainer from '../../containers/HomeContainer';
//import CotizacionContainer from './src/containers/CotizacionContainer';
import ReportesContainer from '../../containers/ReportesContainer';
import store from '../../../store';

const DrawerApp = createDrawerNavigator();

const DrawerNavigator = () => {
  const user = store.getState().user;
  return (
    <DrawerApp.Navigator
      edgeWidth={200}
      drawerContent={({navigation}) => (
        <DrawerContent user={user} navigation={navigation} />
      )}
      drawerType="back">
      <DrawerApp.Screen name="Inicio" component={HomeContainer} />
      <DrawerApp.Screen name="Reportes" component={ReportesContainer} />
    </DrawerApp.Navigator>
  );
};

export default DrawerNavigator;
