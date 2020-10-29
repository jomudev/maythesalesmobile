/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './drawerContent';
import HomeContainer from '../../containers/HomeContainer';
//import CotizacionContainer from './src/containers/CotizacionContainer';
import ReportesContainer from '../../containers/ReportesContainer';
import Configuracion from '../../containers/configuracionContainer';
import auth from '@react-native-firebase/auth';
import {StatusBar} from 'react-native';

const DrawerApp = createDrawerNavigator();

const DrawerNavigator = () => {
  const user = auth().currentUser;
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#000000ff"
      />
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
        <DrawerApp.Screen name="Configuracion" component={Configuracion} />
      </DrawerApp.Navigator>
    </>
  );
};

export default DrawerNavigator;
