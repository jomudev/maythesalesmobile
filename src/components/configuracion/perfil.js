import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import {TextBox} from '../auxComponents';
import {db} from '../mainFunctions';

const Perfil = () => {
  const user = auth().currentUser;
  const [userName, setUserName] = useState(user.displayName);
  const [businessName, setBusinessName] = useState(null);
  const [businessPhone, setBusinessPhone] = useState(null);

  const getUserData = (type) => {
    if (businessName || businessPhone) {
      switch (type) {
        case 'negocio':
          return businessName ? businessName : '';
        case 'telefono':
          return businessPhone ? businessPhone : '';
        default:
          return '';
      }
    } else {
      return '';
    }
  };

  const setValue = (element, value) => {
    switch (element) {
      case 'nombre':
        setUserName(value);
        break;
      case 'negocio':
        setBusinessName(value);
        break;
      case 'telefono':
        setBusinessPhone(value);
    }
  };

  const updateUserData = async (userNameValue) => {
    try {
      if (userNameValue) {
        user.updateProfile({
          displayName: userName,
        });
      } else {
        db().update({
          negocio: businessName,
          telefono: businessPhone,
        });
      }
    } catch (err) {
      console.warn('error al intentar actualizar los datos del usuario: ', err);
    }
  };

  useEffect(() => {
    const unsubscribe = db().onSnapshot((snap) => {
      const data = snap.data();
      setBusinessName(data.negocio);
      setBusinessPhone(data.telefono);
    });

    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        Esta información sera utilizada al momento de generar los reportes.
      </Text>
      <Text style={styles.label}>Nombre:</Text>
      <TextBox
        style={styles.text}
        autoCapitalize="words"
        defaultValue={user.displayName}
        placeholder="No asignado"
        onEndEditing={() => updateUserData(userName)}
        onChangeText={(text) => setUserName(text)}
      />
      <Text style={styles.label}>Nombre del negocio:</Text>
      <TextBox
        style={styles.text}
        autoCapitalize="words"
        defaultValue={getUserData('negocio')}
        placeholder="No asignado"
        onEndEditing={() => updateUserData()}
        onChangeText={(text) => setValue('negocio', text.trim())}
      />
      <Text style={styles.label}>Teléfono:</Text>
      <TextBox
        style={styles.text}
        defaultValue={getUserData('telefono')}
        placeholder="No asignado"
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
