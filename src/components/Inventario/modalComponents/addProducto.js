/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import Button from './button';
import {save} from './modalMetodos';
import styles from './modalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useForm} from 'react-hook-form';

const AddProducto = ({navigation, route}) => {
  const {register, handleSubmit, errors, setValue} = useForm();
  const [barcode, setBarcode] = useState();
  const nombre = useRef();
  const cantidad = useRef();
  const proveedor = useRef();
  const costoPU = useRef();
  const costoPM = useRef();
  const precioPU = useRef();
  const precioPM = useRef();
  const descripcion = useRef();

  if (route.params) {
    setBarcode(route.params.scannedBarcode);
  }

  const clean = () => {
    nombre.current.clear();
    cantidad.current.clear();
    proveedor.current.clear();
    costoPM.current.clear();
    costoPU.current.clear();
    precioPM.current.clear();
    precioPU.current.clear();
    descripcion.current.clear();
    barcode.current.clear();
  };

  const onSubmit = (data) => {
    save('product', {
      nombre: data.nombre,
      cantidad: data.cantidad,
      proveedor: data.proveedor,
      costoPM: data.costoPM,
      costoPU: data.costoPU,
      precioPM: data.precioPM,
      precioPU: data.precioPU,
      descripcion: data.descripcion,
      codigoDeBarras: barcode,
    });
    clean();
  };

  useEffect(() => {
    register('nombre', {required: true});
    register('cantidad');
    register('proveedor');
    register('costoPM');
  }, [register]);

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
            name="view-week"
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
          onChangeText={(text) => setValue('Nombre', text)}
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
          placeholder="Costo por unidad"
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={(text) => setValue('costoPU', text)}
          ref={costoPU}
        />

        <TextInput
          placeholder="Costo por mayoreo"
          keyboardType="number-pad"
          style={styles.txtInput}
          onChangeText={(text) => setValue('costoPM', text)}
          ref={costoPM}
        />

        <TextInput
          placeholder="Precio por unidad"
          keyboardType="number-pad"
          style={styles.txtInput}
          onChangeText={(text) => setValue('precioPU', text)}
          ref={precioPU}
        />

        <TextInput
          placeholder="Precio por mayoreo"
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={(text) => setValue('precioPM', text)}
          ref={precioPM}
        />

        <TextInput
          placeholder="Descripción"
          style={styles.txtInput}
          onChangeText={(text) => setValue('descripcion', text)}
          ref={descripcion}
        />
        <Button action={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

export default AddProducto;
