/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import Button from './button';
import {save} from './modalMetodos';
import styles from './modalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import Snackbar from 'react-native-snackbar-component';

const AddProducto = ({navigation, route}) => {
  const paramsBarcode = route.params ? route.params.scannedBarcode.data : '';
  const {register, handleSubmit, errors, setValue} = useForm();
  const [snackIsActive, setSnackIsActive] = useState(false);
  const [snackMessage, setSnackMessage] = useState('Algo no anda bien.');
  const [barcode, setBarcode] = useState('');
  const nombre = useRef();
  const cantidad = useRef();
  const proveedor = useRef();
  const precioCosto = useRef();
  const precioVenta = useRef();
  const descripcion = useRef();

  if (paramsBarcode && barcode !== paramsBarcode) {
    setBarcode(paramsBarcode);
  }

  const handleSetSnackMessage = (message) => {
    setSnackMessage(message);
    setSnackIsActive(true);
  };

  const clean = () => {
    setBarcode('');
    nombre.current.clear();
    cantidad.current.clear();
    proveedor.current.clear();
    precioCosto.current.clear();
    precioVenta.current.clear();
    descripcion.current.clear();
  };

  const onSubmit = (data) => {
    save(
      'product',
      {
        codigoDeBarras: barcode,
        nombre: data.nombre,
        cantidad: data.cantidad,
        proveedor: data.proveedor,
        precioCosto: data.precioCosto,
        precioVenta: data.precioVenta,
        descripcion: data.descripcion,
      },
      handleSetSnackMessage,
    );
    clean();
  };

  useEffect(() => {
    register('nombre', {required: true});
    register('cantidad');
    register('proveedor');
    register('precioCosto');
    register('precioVenta');
    register('descripcion');
  }, [register, route.params]);
  return (
    <ScrollView style={styles.form}>
      <Text style={styles.formTitle}>Agregar producto</Text>
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            editable={false}
            placeholder="Codigo de barras"
            style={{...styles.txtInput, flex: 9}}
            value={barcode}
          />
          <Icon
            name="barcode"
            style={styles.Icon}
            onPress={() =>
              navigation.navigate('CamScanner', {
                type: 'getBarcode',
                screen: 'Productos',
              })
            }
          />
        </View>

        <TextInput
          placeholder="Nombre del producto*"
          style={styles.txtInput}
          onChangeText={(text) => setValue('nombre', text)}
          ref={nombre}
        />
        {errors.nombre && <Text>Este campo es obligatorio</Text>}

        <TextInput
          placeholder="Cantidad"
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={(text) => setValue('cantidad', text)}
          ref={cantidad}
        />

        <TextInput
          placeholder="Proveedor"
          style={styles.txtInput}
          onChangeText={(text) => setValue('proveedor', text)}
          ref={proveedor}
        />

        <TextInput
          placeholder="Precio de costo"
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={(text) => setValue('precioCosto', text)}
          ref={precioCosto}
        />

        <TextInput
          placeholder="Precio de venta"
          keyboardType="number-pad"
          style={styles.txtInput}
          onChangeText={(text) => setValue('precioVenta', text)}
          ref={precioVenta}
        />

        <TextInput
          placeholder="Descripción"
          style={styles.txtInput}
          onChangeText={(text) => setValue('descripcion', text)}
          ref={descripcion}
        />
        <Button action={handleSubmit(onSubmit)} />
      </View>
      <Snackbar
        visible={snackIsActive}
        textMessage={snackMessage}
        actionText="OK"
        actionHandler={() => setSnackIsActive(false)}
      />
    </ScrollView>
  );
};

export default AddProducto;
