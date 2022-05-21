import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../../components/reports';
//import MonthReports from '../../components/reports/monthReports';
//import YearReports from '../../components/reports/yearReports';

const Stack = createStackNavigator();

const ReportesContainer = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="generalReports" component={Index} />
    </Stack.Navigator>
  );
};

/**
 * 
      <Stack.Screen name="yearReports" component={YearReports} />
      <Stack.Screen name="monthReports" component={MonthReports} />
 */

export default ReportesContainer;
