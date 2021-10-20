/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeContainer from '../../containers/HomeContainer';
import ReportesContainer from '../../containers/ReportesContainer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StatusBar} from 'react-native';
const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#0000"
      />
      <Tab.Navigator
        edgeWidth={50}
        initialRouteName="Inicio"
        inactiveColor="#b4b6be"
        barStyle={{
          backgroundColor: '#fff',
        }}
        activeColor="#101e5a"
        shifting
        sceneAnimationEnabled
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;
            if (route.name === 'Inicio') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Reportes') {
              iconName = focused ? 'clipboard-file' : 'clipboard-file-outline';
            }
            return <Icon size={24} name={iconName} color={color} />;
          },
        })}>
        <Tab.Screen name="Inicio" component={HomeContainer} />
        <Tab.Screen name="Reportes" component={ReportesContainer} />
      </Tab.Navigator>
    </>
  );
};

export default MainNavigator;
