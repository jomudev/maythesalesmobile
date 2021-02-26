import React from 'react';
import {ScrollView} from 'react-native';
import options from './data';
import ListItem from './listItem';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import store from '../../../store';
import auth from '@react-native-firebase/auth';

const ConfigOpciones = (props) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.container}>
      {options.map((item) => (
        <ListItem key={item.name} item={item} {...props} />
      ))}
      <TouchableOpacity
        style={{...styles.ListItem, ...styles.logoutButton}}
        onPress={() => {
          store.dispatch({
            type: 'SIGN_OUT',
          });
          auth().signOut();
        }}>
        <View style={styles.listIcon}>
          <Icon name={'logout'} size={24} color="#101e5a" />
        </View>
        <View style={styles.listInfo}>
          <Text style={{fontSize: 16}}>Cerrar sesión</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ConfigOpciones;
