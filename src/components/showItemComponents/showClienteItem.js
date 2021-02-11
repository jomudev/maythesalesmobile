/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../showInformacionComponents/styles';
import {update} from '../mainFunctions';
import {TextBox} from '../auxComponents';

const ShowClienteItem = ({data, editIcon, closeIcon}) => {
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(editIcon);
  const [nombre, setNombre] = useState(data.nombre);

  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? closeIcon : editIcon);
  };

  const handleUpdate = (element, value) => {
    if (!value) {
      return;
    }
    Object.defineProperty(data, element, {
      value,
      writable: true,
    });
    update('productos', data)
      .then(() => {
        console.log('coleccion actualizada');
      })
      .catch((err) => console.log('async err: ' + err));
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
            <TextBox
              placeholder={`Editar nombre: ${data.nombre}`}
              style={styles.txtInput}
              TextContentType="family-name"
              onChangeText={(text) => setNombre(text)}
              onSubmitEditing={() => handleUpdate('nombre', nombre)}
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
        <TextBox
          placeholder={!data.telefono ? 'No asignado...' : ''}
          defaultValue={data.telefono ? data.telefono : ''}
          style={styles.txtInput}
          keyboardType="phone-pad"
        />
        <Text>Email</Text>
        <TextBox
          placeholder={!data.email ? 'No asignado...' : ''}
          defaultValue={data.email ? data.email : ''}
          style={styles.txtInput}
        />
        <Text>Descripción</Text>
        <TextBox
          placeholder={!data.descripcion ? 'No asignado...' : ''}
          defaultValue={data.descripcion !== '' ? data.descripcion : ''}
          style={styles.txtInput}
        />
      </View>
    </View>
  );
};

export default ShowClienteItem;
