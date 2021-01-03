/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';
import DisplayImageComponent from './displayImageComponent';
import ShowImage from './showImage';
import {update} from '../../../mainFunctions';
import {moneyFormat} from '../../../mainFunctions';
import {useForm} from 'react-hook-form';

const ShowProductoItem = ({data, type, navigation, closeIcon, editIcon}) => {
  const {register, getValues, setValue} = useForm();
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(editIcon);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    register('nombre');
    register('descripcion');
    register('marca');
    register('precioVenta');
    register('precioCosto');
  });

  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? closeIcon : editIcon);
  };

  const handleUpdate = (element, value) => {
    Object.defineProperty(data, element, {
      value,
      writable: true,
    });
    update('productos', data).catch((err) => console.log('async err: ' + err));
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
              onChangeText={(text) => setValue('nombre', text)}
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
          defaultValue={data.barcode}
          placeholder="No asignado..."
        />
        <Text>Marca</Text>
        <TextInput
          placeholder="No asignado"
          defaultValue={data.marca ? data.marca : ''}
          style={styles.txtInput}
          onChangeText={(text) => setValue('marca', text)}
          onEndEditing={() => handleUpdate('marca', getValues('marca'))}
        />
        <Text>Descripción</Text>
        <TextInput
          onEndEditing={() =>
            handleUpdate('descripcion', getValues('descripcion'))
          }
          onChangeText={(text) => setValue('descripcion', text)}
          style={{...styles.txtInput, overflow: 'hidden', maxHeight: 100}}
          multiline={true}
          defaultValue={data.descripcion ? data.descripcion : ''}
          placeholder="No asignado..."
        />
        <Text>Precio de venta por unidad</Text>
        <View style={styles.priceContainer}>
          <TextInput
            onEndEditing={() =>
              handleUpdate('precioVenta', getValues('precioVenta'))
            }
            placeholder={moneyFormat(data.precioVenta)}
            onChangeText={(text) =>
              setValue('precioVenta', Number.parseInt(text, 10))
            }
            style={styles.txtInput}
          />
        </View>
        <Text>Precio de costo por unidad</Text>
        <View style={styles.priceContainer}>
          <TextInput
            onEndEditing={() => handleUpdate('precioCosto', precioCosto)}
            onChangeText={(text) =>
              setValue('precioCosto', Number.parseInt(text, 10))
            }
            placeholder={moneyFormat(data.precioCosto)}
            style={styles.txtInput}
          />
        </View>
        <Text style={{fontSize: 24}}>
          Ganancia: {moneyFormat(data.precioVenta - data.precioCosto)}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ShowProductoItem;
