import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Header from './../../components/header';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../../components/reportes';
import ReporteMes from '../../components/reportes/reporteMes';

const Stack = createStackNavigator();

const ReportesContainer = ({navigation}) => {
  return (
    <NavigationContainer independent={true}>
      <Header navigation={navigation} />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="inicio" component={Index} {...navigation} />
        <Stack.Screen name="reporteMes" component={ReporteMes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ReportesContainer;
