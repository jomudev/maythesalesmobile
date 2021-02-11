import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ConfigOpciones from '../../components/configuracion';
import Perfil from '../../components/configuracion/perfil';
import AgregarUsuario from '../../components/configuracion/agregarUsuario';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    padding: 5,
  },
});

const Stack = createStackNavigator();
const Configuracion = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
          },
          headerTintColor: '#103e5a',
          headerLeft: (props) => {
            return (
              <Icon
                style={styles.icon}
                name="menu"
                size={28}
                color="#101e5a"
                onPress={() => navigation.toggleDrawer()}
              />
            );
          },
        }}
        name="Configuracion"
        component={ConfigOpciones}
      />
      <Stack.Screen
        name="personalData"
        options={{
          title: 'Información personal',
        }}
        component={Perfil}
      />
      <Stack.Screen name="addData" component={AgregarUsuario} />
    </Stack.Navigator>
  );
};
export default Configuracion;
