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
  header: {
    elevation: 0,
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

const ReportesContainer = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#103e5a',
        headerStyle: styles.header,
        headerLeft: () => <MenuIcon {...props} />,
      }}>
      <Stack.Screen name="Reportes" component={Index} />
      <Stack.Screen
        name="reporteMes"
        options={({route}) => ({
          title: `Reportes del mes de ${route.params.params.month}`,
        })}
        component={ReporteMes}
      />
    </Stack.Navigator>
  );
};

export default ReportesContainer;
