/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TextBox, Button} from '../auxComponents';
import styles from './styles';
import {save} from './functions';
import {useForm} from 'react-hook-form';
import {handleSetSnackMessage} from '../mainFunctions';
import Snackbar from 'react-native-snackbar-component';
import LoadingScreen from '../loadingScreen';

const AddProveedor = () => {
  const {register, handleSubmit, errors, setValue, watch, reset} = useForm();
  const [snackIsActive, setSnackIsActive] = useState(false);
  const [snackMessage, setSnackMessage] = useState('Algo no anda bien.');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    save('provider', data)
      .then(() =>
        handleSetSnackMessage(
          'El registro se ha guardado con exito',
          setSnackIsActive,
          setSnackMessage,
        ),
      )
      .catch(() =>
        handleSetSnackMessage(
          '¡Ups! Ha ocurrido un error al intentar guardar el registro.',
          setSnackIsActive,
          setSnackMessage,
        ),
      );
    reset();
  };

  useEffect(() => {
    register('nombre', {required: true});
    register('telefono');
    register('email');
    register('descripcion');
  }, [register]);

  return (
    <View style={styles.form}>
      {isLoading ? <LoadingScreen /> : null}
      <ScrollView>
        <TextBox
          placeholder="Nombre*"
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
          keyboardType="email-address"
          style={styles.txtInput}
          onChangeText={(text) => setValue('email', text)}
        />
        <TextBox
          placeholder="Descripción"
          value={watch('descripcion')}
          style={styles.txtInput}
          onChangeText={(text) => setValue('descripcion', text)}
        />
        <Button action={handleSubmit(onSubmit)} />
      </ScrollView>
      <Snackbar
        visible={snackIsActive}
        textMessage={snackMessage}
        actionText="OK"
        actionHandler={() => setSnackIsActive(false)}
        position="bottom"
      />
    </View>
  );
};

export default AddProveedor;
