import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import {TextBox} from '../auxComponents';
import {db} from '../mainFunctions';

const Perfil = () => {
  const user = auth().currentUser;
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState(null);

  const getUserData = (type) => {
    if (userData) {
      switch (type) {
        case 'negocio':
          return userData.negocio ? userData.negocio : '';
        case 'telefono':
          return userData.telefono ? userData.telefono : '';
        default:
          return '';
      }
    } else {
      return '';
    }
  };

  const setValue = (element, value) => {
    Object.defineProperty(userData, element, {
      value,
      writable: true,
    });
  }

  const updateUserData = async (userNameValue) => {
    try {
      if (userNameValue) {
        user.updateProfile({
          displayName: userName,
        })
      } else {
        db().update(userData);
      }
    } catch (err) {
      console.warn('error al intentar actualizar los datos del usuario: ', err);
    }
  }

  useEffect(() => {
    const unsubscribe = db().onSnapshot((snap) => {
      setUserData(snap.data());
    });

    return unsubscribe;
  }, []);
  return (
    <View style={{...styles.container}}>
      <Text style={styles.label}>Nombre:</Text>
      <TextBox
        style={styles.text}
        autoCapitalize="words"
        defaultValue={user.displayName}
        placeholder={userData ? 'No asignado' : 'Cargando...'}
        onEndEditing={() => updateUserData(userName)}
        onChangeText={(text) => setUserName(text)}
      />
      <Text style={styles.label}>Nombre del negocio:</Text>
      <TextBox
        style={styles.text}
        defaultValue={getUserData('negocio')}
        placeholder={userData ? 'No asignado' : 'Cargando...'}
        onEndEditing={() => updateUserData()}
        onChangeText={(text) => setValue('negocio', text.trim())}
      />
      <Text style={styles.label}>Teléfono:</Text>
      <TextBox
        style={styles.text}
        defaultValue={getUserData('telefono')}
        placeholder={userData ? 'No asignado' : 'Cargando...'}
        onEndEditing={() => updateUserData()}
        keyboardType="phone-pad"
        onChangeText={(text) => {
          setValue('telefono', text.trim());
        }}
      />
    </View>
  );
};

export default Perfil;
