import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../../components/reports';
import Sales from '../../components/reports/sales';
import SaleReport from '../../components/reports/saleReport';

const Stack = createStackNavigator();

const ReportesContainer = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="generalReports" component={Index} />
      <Stack.Screen name="Sales" component={Sales} />
      <Stack.Screen name="SaleReport" component={SaleReport} />
    </Stack.Navigator>
  );
};

export default ReportesContainer;
