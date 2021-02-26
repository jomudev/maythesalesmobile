import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../../components/reportes';
import ReporteMes from '../../components/reportes/reporteMes';

const Stack = createStackNavigator();

const ReportesContainer = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Reporte General" component={Index} />
      <Stack.Screen name="reporteMes" component={ReporteMes} />
    </Stack.Navigator>
  );
};

export default ReportesContainer;
