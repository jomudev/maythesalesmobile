/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, ToastAndroid} from 'react-native';
import {TextBox, Button} from '../auxComponents';
import {save} from './functions';
import styles from './styles';
import {useForm} from 'react-hook-form';
import LoadingScreen from '../loadingScreen';

const AddCliente = () => {
  const {register, handleSubmit, errors, setValue, watch, reset} = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    save('client', data)
      .then(() => {
        ToastAndroid.show(
          'El registro se ha guardado con exito.',
          ToastAndroid.SHORT,
        );
        setIsLoading(false);
        reset();
      })
      .catch((err) => {
        console.warn('err saving client ' + JSON.stringify(err));
        ToastAndroid.show(
          'Error al intentar registrar el cliente, intentelo de nuevo.',
          ToastAndroid.SHORT,
        );
        setIsLoading(false);
      });
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
        <Text style={styles.screenDescription}>
          Agrega tus clientes para poder tener un mejor control de a quién le
          vendes
        </Text>
        <TextBox
          placeholder="Nombres*"
          value={watch('nombre')}
          autoCapitalize="words"
          style={styles.txtInput}
          onChangeText={(text) => setValue('nombre', text)}
        />
        {errors.nombre && <Text>Este campo es obligatorio</Text>}
        <TextBox
          placeholder="Número de teléfono"
          keyboardType="numeric"
          value={watch('telefono')}
          style={styles.txtInput}
          onChangeText={(text) => setValue('telefono', text)}
        />
        <TextBox
          placeholder="Correo Electrónico"
          value={watch('email')}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.txtInput}
          onChangeText={(text) => setValue('email', text)}
        />
        <TextBox
          placeholder="Descripción"
          numberOfLines={4}
          multiline={true}
          value={watch('descripcion')}
          isTextArea={true}
          style={styles.txtInput}
          onChangeText={(text) => setValue('descripcion', text)}
        />
      </ScrollView>
      <Button action={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AddCliente;
