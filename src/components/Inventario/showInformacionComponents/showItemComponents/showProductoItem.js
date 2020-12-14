import React, {useState} from 'react';
import {View, TextInput, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';
import DisplayImageComponent from './displayImageComponent';
import ShowImage from './showImage';
import {update} from './functions';

const ShowProductoItem = ({data, type,  navigation, closeIcon, editIcon}) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState(data.descripcion);
  const [marca, setMarca] = useState(data.marca);
  const [precioVenta, setPrecioVenta] = useState(data.precioVenta);
  const [precioCosto, setPrecioCosto] = useState(data.precioCosto);
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(editIcon);
  const [showImage, setShowImage] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? closeIcon : editIcon);
  };

  const handleUpdate = (element, value) => {
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
              defaultValue={data.nombre}
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
            data.barcode ? data.barcode : 'No Asignado...'
          }
        />
        <Text>Marca</Text>
        <TextInput 
          placeholder={data.marca}
          defaultValue={marca}
          style={styles.txtInput}
          onChangeText={(text) => setMarca(text)}
          onEndEditing={() => handleUpdate('marca', marca)}
        />
        <Text>Descripción</Text>
        <TextInput
          onEndEditing={() => handleUpdate('descripcion', descripcion)}
          onChangeText={(text) => setDescripcion(text)}
          style={{...styles.txtInput, overflow: 'hidden', maxHeight: 100}}
          multiline={true}
          defaultValue={data.descripcion ? data.descripcion : 'No asignado...'}
        />
        <Text>Precio de venta por unidad</Text>
        <View style={styles.priceContainer}>
          <Text style={{fontSize: 18}}>L.</Text>
          <TextInput
            onEndEditing={() => handleUpdate('precioVenta', precioVenta)}
            defaultValue={`${parseFloat(precioVenta).toFixed(2)}`}
            onChangeText={(text) => setPrecioVenta(Number.parseInt(text))}
            style={styles.txtInput}
          />
        </View>
        <Text>Precio de costo por unidad</Text>
        <View style={styles.priceContainer}>
          <Text style={{fontSize: 18}}>L.</Text>
          <TextInput
            onEndEditing={() => handleUpdate('precioCosto', precioCosto)}
            onChangeText={(text) => setPrecioCosto(Number.parseInt(text))}
            defaultValue={`${parseFloat(precioCosto).toFixed(2)}`}
            style={styles.txtInput}
          />
        </View>
        <TextInput 
          editable={false}
          style={styles.txtInput}
          defaultValue={`Ganancia: L.${precioVenta-precioCosto}`}
        />
      </View>
    </ScrollView>
  );
};

export default ShowProductoItem;
