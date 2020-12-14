/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {Text, TextInput, View, ScrollView} from 'react-native';
import Button from './button';
import {save} from './modalMetodos';
import styles from './modalStyles';
import {useForm} from 'react-hook-form';

const initialFormValues = {
  nombre: '',
  marca: '',
  cantidad: '',
  proveedor: '',
  precioCosto: '',
  precioVenta: '',
}

const AddServicio = () => {
  const {reset, register, handleSubmit, setValue, errors, watch} = useForm({
    defaultValues: initialFormValues
  });

  useEffect(() => {
    register('nombre', {required: true});
    register('cantidad');
    register('proveedor');
    register('precioCosto');
    register('precioVenta');
  }, [register]);

  const clean = () => {
    reset();
  };

  const onSubmit = (data) => {
    save('service', data);
    clean();
  };

  return (
    <ScrollView style={styles.form}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.formTitle}>Agregar Servicio</Text>
        <TextInput
          placeholder="Nombre del servicio*"
          style={styles.txtInput}
          onChangeText={(text) => setValue(text)}
        />
        {errors.nombre && <Text>Este campo es obligatorio</Text>}
        <TextInput
          placeholder="Marca del producto"
          style={styles.txtInput}
          onChangeText={(text) => setValue('marca', text)}
          value={`${watch('marca')}`}
        />
        <TextInput
          placeholder="Cantidad"
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={(text) => setValue(text)}
        />

        <TextInput
          placeholder="Proveedor"
          style={styles.txtInput}
          onChangeText={(text) => setValue(text)}
        />

        <TextInput
          placeholder="Precio de costo"
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={(text) => setValue(text)}
        />

        <TextInput
          placeholder="Precio de venta"
          keyboardType="number-pad"
          style={styles.txtInput}
          onChangeText={(text) => setValue(text)}
        />
        <TextInput
          placeholder="Descripción"
          style={styles.txtInput}
          onChangeText={(text) => setValue(text)}
        />
        <Button
          action={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
};

export default AddServicio;
