import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from './index';
import ReporteMes from './reporteMes';
const Stack = createStackNavigator();

const VentasGeneral = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Principal" component={Index} />
      <Stack.Screen name="ReporteMes" component={ReporteMes} />
    </Stack.Navigator>
  );
};

export default VentasGeneral;