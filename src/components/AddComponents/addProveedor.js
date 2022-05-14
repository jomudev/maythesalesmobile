/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, ToastAndroid} from 'react-native';
import {TextBox, Button} from '../auxComponents';
import styles from './styles';
import {save} from './functions';
import {useForm} from 'react-hook-form';
import LoadingScreen from '../loadingScreen';

const AddProveedor = () => {
  const {register, handleSubmit, errors, setValue, watch} = useForm();
  const [isLoading, setIsLoading] = useState(false);
  
  const reset = () => {
    setValue('nombre', '')
    setValue('telefono', '')
    setValue('email', '')
    setValue('descripcion', '')
  }

  const onSubmit = (data) => {
    setIsLoading(true);
    save('provider', data)
      .then(() => {
        ToastAndroid.show(
          'El registro se ha guardado con exito', ToastAndroid.SHORT
        );
        setIsLoading(false);
      })
      .catch(() => {
        ToastAndroid.show(
          '¡Ups! Ha ocurrido un error al intentar guardar el registro.',
          ToastAndroid.SHORT,
        );
        setIsLoading(false);
      });
    reset();
  };

  useEffect(() => {
    register('nombre', {required: true});
    register('telefono');
    register('email');
    register('descripcion');
  }, []);

  return (
    <View style={styles.form}>
      {isLoading ? <LoadingScreen /> : null}
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}>
        <TextBox
          placeholder="Nombre*"
          autoCapitalize="words"
          value={watch('nombre')}
          style={styles.txtInput}
          onChangeText={(text) => setValue('nombre', text)}
        />
        {errors.nombre && <Text>Este campo es obligatorio</Text>}
        <TextBox
          placeholder="Número de teléfono"
          value={watch('telefono')}
          keyboardType="numeric"
          style={styles.txtInput}
          onChangeText={(text) => setValue('telefono', text)}
        />
        <TextBox
          placeholder="Correo Electrónico"
          value={watch('email')}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.txtInput}
          onChangeText={(text) => setValue('email', text)}
        />
        <TextBox
          placeholder="Descripción"
          value={watch('descripcion')}
          isTextArea={true}
          numberOfLines={4}
          multiline={true}
          style={styles.txtInput}
          onChangeText={(text) => setValue('descripcion', text)}
        />
        <Button action={handleSubmit(onSubmit)} />
      </ScrollView>
    </View>
  );
};

export default AddProveedor;
