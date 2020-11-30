/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';

//import DisplayImageComponent from './displayImageComponent';
//import ShowImage from './showImage';

const ShowServicioItem = ({data}) => {
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(editIcon);

  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? closeIcon : editIcon);
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.nombreContainer}>
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
        <Text>Descripción</Text>
        <TextInput
          placeholder={data.descripcion ? data.descripcion : 'No asignado...'}
          style={styles.txtInput}
        />
        <Text>Precio de venta por unidad</Text>
        <TextInput
          placeholder={`${parseFloat(data.precioVenta).toFixed(2)}`}
          keyboardType="phone-pad"
          style={styles.txtInput}
        />
        <Text>Precio de costo por unidad</Text>
        <TextInput
          placeholder={`${parseFloat(data.precioCosto).toFixed(2)}`}
          keyboardType="phone-pad"
          style={styles.txtInput}
        />
      </View>
    </View>
  );
}

export default ShowServicioItem;