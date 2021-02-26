/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './drawerContent';
import HomeContainer from '../../containers/HomeContainer';
import ReportesContainer from '../../containers/ReportesContainer';
import Configuracion from '../../containers/configuracionContainer';
import auth from '@react-native-firebase/auth';
import {StatusBar, StyleSheet, View} from 'react-native';

const DrawerApp = createDrawerNavigator();

const DrawerNavigator = () => {
  const user = auth().currentUser;
  return (
    <View style={{...StyleSheet.absoluteFillObject}}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#0000"
      />
      <DrawerApp.Navigator
        edgeWidth={50}
        initialRouteName="Inicio"
        screenOptions={{
          unmountOnBlur: true,
        }}
        drawerContent={({navigation}) => (
          <DrawerContent user={user} navigation={navigation} />
        )}
        drawerStyle={{width: '65%'}}
        drawerType="front">
        <DrawerApp.Screen name="Inicio" component={HomeContainer} />
        <DrawerApp.Screen name="Reportes" component={ReportesContainer} />
        <DrawerApp.Screen name="Configuracion" component={Configuracion} />
      </DrawerApp.Navigator>
    </View>
  );
};

export default DrawerNavigator;
