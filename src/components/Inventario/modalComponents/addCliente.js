/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect} from 'react';
import {ScrollView, View, TextInput, Text} from 'react-native';
import {save} from './modalMetodos';
import styles from './modalStyles';
import Button from './button';
import {useForm} from 'react-hook-form';

const AddCliente = () => {
  const {register, handleSubmit, errors, setValue} = useForm();
  const nombre = useRef();
  const telefono = useRef();
  const email = useRef();
  const descripcion = useRef();

  const clean = () => {
    nombre.current.clear();
    telefono.current.clear();
    email.current.clear();
    descripcion.current.clear();
  };

  const onSubmit = (data) => {
    save('client', {
      nombre: data.nombre,
      telefono: data.telefono,
      email: data.email,
      descripcion: data.descripcion,
    });
    clean();
  };

  useEffect(() => {
    register('nombre', {required: true});
    register('telefono');
    register('email');
    register('descripcion');
  }, []);

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.formTitle}>Agregar cliente</Text>
      <View style={{alignItems: 'center'}}>
        <TextInput
          placeholder="Nombres*"
          style={styles.txtInput}
          ref={nombre}
          onChangeText={(text) => setValue('nombre', text)}
        />
        {errors.nombre && <Text>Este campo es obligatorio</Text>}
        <TextInput
          placeholder="Número de teléfono"
          keyboardType="numeric"
          style={styles.txtInput}
          ref={telefono}
          onChangeText={(text) => setValue('telefono', text)}
        />
        <TextInput
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          style={styles.txtInput}
          ref={email}
          onChangeText={(text) => setValue('email', text)}
        />
        <TextInput
          placeholder="Descripción"
          style={styles.txtInput}
          ref={descripcion}
          onChangeText={(text) => setValue('descripcion', text)}
        />
        <Button action={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

export default AddCliente;
