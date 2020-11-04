/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {Text, TextInput, View, ScrollView} from 'react-native';
import Button from './button';
import {save} from './modalMetodos';
import styles from './modalStyles';
import {useForm} from 'react-hook-form';

const AddServicio = () => {
  const {register, handleSubmit, setValue, errors} = useForm();
  const nombre = useRef();
  const cantidad = useRef();
  const proveedor = useRef();
  const costoPU = useRef();
  const costoPM = useRef();
  const precioPU = useRef();
  const precioPM = useRef();
  const descripcion = useRef();

  useEffect(() => {
    register('nombre', {required: true});
    register('cantidad');
    register('proveedor');
    register('costoPU');
    register('costoPM');
    register('precioPU');
    register('precioPM');
    register('descripcion');
  }, [register]);

  const clean = () => {
    nombre.current.clear();
    cantidad.current.clear();
    proveedor.current.clear();
    costoPM.current.clear();
    costoPU.current.clear();
    precioPM.current.clear();
    precioPU.current.clear();
    descripcion.current.clear();
  };

  const onSubmit = (data) => {
    save('service', {
      nombre: data.nombre,
      cantidad: data.cantidad,
      proveedor: data.proveedor,
      costoPM: data.costoPM,
      costoPU: data.costoPU,
      precioPM: data.precioPM,
      precioPU: data.precioPU,
      descripcion: data.descripcion,
    });
    clean();
  };

  return (
    <ScrollView style={styles.form}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.formTitle}>Agregar Servicio</Text>
        <TextInput
          placeholder="Nombre del producto*"
          style={styles.txtInput}
          onChangeText={(text) => setValue(text)}
          ref={nombre}
        />
        {errors.nombre && <Text>Este campo es obligatorio</Text>}

        <TextInput
          placeholder="Cantidad"
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={(text) => setValue(text)}
          ref={cantidad}
        />

        <TextInput
          placeholder="Proveedor"
          style={styles.txtInput}
          onChangeText={(text) => setValue(text)}
          ref={proveedor}
        />

        <TextInput
          placeholder="Costo por unidad"
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={(text) => setValue(text)}
          ref={costoPU}
        />

        <TextInput
          placeholder="Costo por mayoreo"
          keyboardType="number-pad"
          style={styles.txtInput}
          onChangeText={(text) => setValue(text)}
          ref={costoPM}
        />

        <TextInput
          placeholder="Precio por unidad"
          keyboardType="number-pad"
          style={styles.txtInput}
          onChangeText={(text) => setValue(text)}
          ref={precioPU}
        />

        <TextInput
          placeholder="Precio por mayoreo"
          style={styles.txtInput}
          keyboardType="number-pad"
          cantidad
          onChangeText={(text) => setValue(text)}
          ref={precioPM}
        />

        <TextInput
          placeholder="Descripción"
          style={styles.txtInput}
          onChangeText={(text) => setValue(text)}
          ref={descripcion}
        />
        <Button
          action={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
};

export default AddServicio;
