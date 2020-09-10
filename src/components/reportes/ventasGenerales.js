import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Index from './index';
import ReporteMes from './reporteMes';
const Stack = createStackNavigator();

const VentasGeneral = ({navigation}) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Principal" component={Index} />
        <Stack.Screen name="ReporteMes" component={ReporteMes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default VentasGeneral;
