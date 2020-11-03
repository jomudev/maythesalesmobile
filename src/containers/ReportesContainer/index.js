import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../../components/reportes';
import ReporteMes from '../../components/reportes/reporteMes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    padding: 5,
  },
});

const Stack = createStackNavigator();

const MenuIcon = ({navigation}) => (
  <Icon
    style={styles.icon}
    name="menu"
    size={28}
    color="#101e5a"
    onPress={() => navigation.toggleDrawer()}
  />
);

const ReportesContainer = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLeft: () => <MenuIcon {...props} />,
        }}
        name="Reportes"
        component={Index}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <MenuIcon {...props}/>,
        }}
        name="Reportes por mes"
        component={ReporteMes}
      />
    </Stack.Navigator>
  );
};

export default ReportesContainer;
