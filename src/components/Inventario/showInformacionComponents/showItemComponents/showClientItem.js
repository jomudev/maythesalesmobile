/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';

const ShowClienteItem = ({data, editIcon, closeIcon}) => {
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(editIcon);

  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? closeIcon : editIcon);
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          {edit ? (
            <TextInput
              placeholder={`Editar nombre: ${data.nombre}`}
              style={styles.txtInput}
            />
          ) : (
            <Text style={styles.nombre}>{data.nombre}</Text>
          )}
          <Icon
            name={icon}
            size={28}
            style={styles.editNombre}
            onPress={() => toggleEdit()}
          />
        </View>
        <Text>Número de teléfono</Text>
        <TextInput
          placeholder={data.telefono ? data.telefono : 'No asignado...'}
          style={styles.txtInput}
          keyboardType="phone-pad"
        />
        <Text>Email</Text>
        <TextInput
          placeholder={data.email ? data.email : 'No asignado...'}
          style={styles.txtInput}
        />
        <Text>Descripción</Text>
        <TextInput
          placeholder={
            data.descripcion !== '' ? data.descripcion : 'No asignada...'
          }
          style={styles.txtInput}
        />
      </View>
    </View>
  );
};

export default ShowClienteItem;