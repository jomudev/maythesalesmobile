/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import {useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Perfil = () => {
  const {register, setValue, handleSubmit, errors} = useForm();
  const user = auth().currentUser;
  const [userData, setUserData] = useState();

  const onSubmit = data => {
    console.log(data);
    const ref = firestore()
      .collection('negocios')
      .doc(user.uid);
    firestore().runTransaction(async t => {
      return await t.get(ref).then(doc => {
        const nombre = user.displayName;
        const negocio = doc.data().negocio;
        const telefono = doc.data().telefono;
        user.updateProfile({
          displayName:
            data.nombre !== nombre && data.nombre !== '' ? data.nombre : nombre,
        });
        t.update(ref, {
          telefono:
            data.telefono !== telefono && data.telefono !== ''
              ? data.telefono
              : telefono,
          negocio:
            data.negocio !== negocio && data.negocio !== ''
              ? data.negocio
              : negocio,
        });
      });
    });
  };

  const setPhone = text => {
    if (text.length <= 8) {
      text = text
        .split('')
        .map((d, i) => (i === 3 ? `${d}-` : d))
        .join('');
      setValue('telefono', text);
    } else {
      Alert.aelrt('Error de formato', 'ingresa un numero de teléfono valido');
    }
  };

  useEffect(() => {
    register('negocio');
    register('nombre');
    register('telefono');

    const unsubscriber = firestore()
      .collection('negocios')
      .doc(user.uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          setUserData(doc.data());
        }
      });

    return () => {
      unsubscriber;
    };
  }, [register, user.uid]);
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View>
          <Text>Nombre:</Text>
          <Text style={{fontSize: 42}}>
            {user
              ? user.displayName
                ? user.displayName
                : 'no asignado'
              : 'cargando...'}
          </Text>
        </View>
        <View>
          <Text>Nombre del negocio:</Text>
          <Text style={{fontSize: 42}}>
            {userData
              ? userData.negocio
                ? userData.negocio
                : 'no asignado'
              : 'cargando...'}
          </Text>
        </View>
        <Text>Numero de telefono:</Text>
        <Text style={{fontSize: 42}}>
          {userData
            ? userData.telefono
              ? userData.telefono
              : 'no asignado'
            : 'cargando...'}
        </Text>
      </View>
      <TextInput
        style={styles.text}
        placeholder="Nombre del negocio"
        onChangeText={text => setValue('negocio', text.trim())}
      />
      <TextInput
        style={styles.text}
        placeholder="Tu nombre"
        onChangeText={text => setValue('nombre', text.trim())}
      />
      <TextInput
        style={styles.text}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        onChangeText={text => setPhone(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={{color: 'white'}}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Perfil;
