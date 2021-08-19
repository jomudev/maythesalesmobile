import React from 'react';
import {Alert} from 'react-native';
import options from './data';
import ListItem from './listItem';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import store from '../../../store';
import auth from '@react-native-firebase/auth';

const ConfigOpciones = (props) => {
  return (
    <View style={styles.container}>
      {options.map((item) => (
        <ListItem key={item.name} item={item} {...props} />
      ))}
      <TouchableOpacity
        style={{...styles.ListItem, ...styles.logoutButton}}
        onPress={logout}>
        <View style={styles.listIcon}>
          <Icon name={'logout'} size={24} color="#101e5a" />
        </View>
        <View style={styles.listInfo}>
          <Text style={{fontSize: 16}}>Cerrar sesión</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const logout = () => {
  Alert.alert(
    'Cerrar sesión',
    '¿Estas seguro que deseas cerrar sesión? tendrás que ingresar nuevamente después.',
    [
      {
        text: 'No, cancelar',
        onPress: () => {},
      },
      {
        text: 'Sí, estoy seguro.',
        onPress: () => {
          store.dispatch({
            type: 'SIGN_OUT',
          });
          auth().signOut();
        },
      },
    ],
  );
}

export default ConfigOpciones;
