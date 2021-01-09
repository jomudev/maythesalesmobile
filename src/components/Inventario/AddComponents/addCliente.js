/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {TextBox} from '../../auxComponents';
import {save} from './functions';
import styles from './styles';
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
        <TextBox
          placeholder="Nombres*"
          style={styles.txtInput}
          onChangeText={(text) => setValue('nombre', text)}
        />
        {errors.nombre && <Text>Este campo es obligatorio</Text>}
        <TextBox
          placeholder="Número de teléfono"
          keyboardType="numeric"
          style={styles.txtInput}
          onChangeText={(text) => setValue('telefono', text)}
        />
        <TextBox
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.txtInput}
          onChangeText={(text) => setValue('email', text)}
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

export default AddCliente;
