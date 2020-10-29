import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ConfigOpciones from '../../components/configuracion';
import Perfil from '../../components/configuracion/perfil';
import AgregarUsuario from '../../components/configuracion/agregarUsuario';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const Configuracion = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{
          headerLeft: ({route, navigation}) => (
            <Icon
              name="arrow-back"
              size={24}
              color="#101e5a"
              onPress={() => navigation.goBack()}
            />
          ),
        }}>
        <Stack.Screen name="Configuracion" component={ConfigOpciones} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Agregar Usuario" component={AgregarUsuario} />
      </Stack.Navigator>
    </>
  );
};

export default Configuracion;
