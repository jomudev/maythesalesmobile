import React from 'react';
import Header from './../../components/header';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../../components/reportes';
import ReporteMes from '../../components/reportes/reporteMes';

const Stack = createStackNavigator();

const ReportesContainer = ({navigation}) => {
  return (
    <>
      <Header navigation={navigation} />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="inicio" component={Index} {...navigation} />
        <Stack.Screen name="reporteMes" component={ReporteMes} />
      </Stack.Navigator>
    </>
  );
};

export default ReportesContainer;
