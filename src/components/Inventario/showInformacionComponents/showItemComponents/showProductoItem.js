import React, {useState} from 'react';
import {View, TextInput, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';
import DisplayImageComponent from './displayImageComponent';
import ShowImage from './showImage';
import {update} from './functions';

const ShowProductoItem = ({data, type, navigation, closeIcon, editIcon}) => {
  const [nombre, setNombre] = useState('');
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(editIcon);
  const [showImage, setShowImage] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? closeIcon : editIcon);
  };

  const handleUpdate = (element, value) => {
    let prevData = data;
    Object.defineProperty(data, element, {
      value,
      writable: true,
    });
    update(type, prevData, data)
      .then(() => {
        console.log('coleccion actualizada');
      })
      .catch((err) => console.log('async err: ' + err));
  };

  return (
    <ScrollView style={styles.container}>
      <DisplayImageComponent
        imageURL={data.imageURL}
        showImage={showImage}
        setShowImage={setShowImage}
      />
      <View style={styles.form}>
        <ShowImage
          data={data}
          setShowImage={setShowImage}
          navigation={navigation}
          type={type}
        />
        <View style={styles.nombreContainer}>
          {edit ? (
            <TextInput
              placeholder={`Editar nombre: ${data.nombre}`}
              onChangeText={setNombre}
              onEndEditing={() => handleUpdate('nombre', nombre)}
              style={{...styles.txtInput, ...styles.nombre}}
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
        <Text>Codigo</Text>
        <TextInput
          editable={false}
          placeholder={
            data.codigoDeBarras ? data.codigoDeBarras : 'No Asignado...'
          }
        />
        <Text>Descripción</Text>
        <TextInput
          onEndEditing={(text) => updateData('descripcion', text)}
          style={styles.txtInput}
          placeholder={data.descripcion ? data.descripcion : 'No asignado...'}
        />
        <Text>Precio de venta por unidad</Text>
        <TextInput
          onEndEditing={(text) => updateData('precioVenta', text)}
          placeholder={`L${parseFloat(data.precioVenta).toFixed(2)}`}
          style={styles.txtInput}
        />
        <Text>Precio de costo por unidad</Text>
        <TextInput
          onEndEditing={(text) => updateData('precioCosto', text)}
          placeholder={`L${parseFloat(data.precioCosto).toFixed(2)}`}
          style={styles.txtInput}
        />
      </View>
    </ScrollView>
  );
};

export default ShowProductoItem;
