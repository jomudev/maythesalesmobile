/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {TextBox} from '../../auxComponents';
import Button from './button';
import {save} from './functions';
import styles from './styles';
import {useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const initialFormValues = {
  nombre: '',
  marca: '',
  cantidad: 0,
  proveedor: '',
  precioCosto: 0,
  precioVenta: 0,
};

const AddServicio = ({navigation, route}) => {
  const paramsBarcode = route.params ? route.params.scannedBarcode.data : '';
  const {reset, register, handleSubmit, setValue, errors} = useForm({
    defaultValues: initialFormValues,
  });
  const [barcode, setBarcode] = useState();
  if (paramsBarcode && barcode !== paramsBarcode) {
    setBarcode(paramsBarcode);
  }

  useEffect(() => {
    register('nombre', {required: true});
    register('marca');
    register('cantidad');
    register('proveedor');
    register('precioCosto');
    register('precioVenta');
  }, [register]);

  const onSubmit = (data) => {
    save('service', data);
    reset();
  };

  return (
    <ScrollView style={styles.form}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.formTitle}>Agregar Servicio</Text>
        <View style={{flexDirection: 'row'}}>
          <TextBox
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
                screen: 'Servicios',
              })
            }
          />
        </View>
        <TextBox
          placeholder="Nombre del servicio*"
          style={styles.txtInput}
          onChangeText={(text) => setValue('nombre', text)}
        />
        {errors.nombre && <Text>Este campo es obligatorio</Text>}
        <TextBox
          placeholder="Marca del producto"
          style={styles.txtInput}
          onChangeText={(text) => setValue('marca', text)}
        />
        <TextBox
          placeholder="Cantidad"
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={(text) => setValue('cantidad', text)}
        />

        <TextBox
          placeholder="Proveedor"
          style={styles.txtInput}
          onChangeText={(text) => setValue('proveedor', text)}
        />

        <TextBox
          placeholder="Precio de costo"
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={(text) => setValue('precioCosto', text)}
        />

        <TextBox
          placeholder="Precio de venta"
          keyboardType="number-pad"
          style={styles.txtInput}
          onChangeText={(text) => setValue('precioVenta', text)}
        />
        <TextBox
          placeholder="Descripción"
          style={styles.txtInput}
          onChangeText={(text) => setValue('descripcion', text)}
        />
        <Button action={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

export default AddServicio;
