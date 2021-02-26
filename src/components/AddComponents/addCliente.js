/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {TextBox, Button} from '../auxComponents';
import {save} from './functions';
import styles from './styles';
import Snackbar from 'react-native-snackbar-component';
import {handleSetSnackMessage} from '../mainFunctions';
import {useForm} from 'react-hook-form';
import LoadingScreen from '../loadingScreen';

const AddCliente = () => {
  const {register, handleSubmit, errors, setValue, watch, reset} = useForm();
  const [snackMessage, setSnackMessage] = useState('Algo no anda bien.');
  const [snackIsActive, setSnackIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    save('client', data)
      .then(() => {
        handleSetSnackMessage(
          'El registro se ha guardado con exito.',
          setSnackIsActive,
          setSnackMessage,
        );
        setIsLoading(false);
        reset();
      })
      .catch((err) => {
        console.warn('err saving client ' + JSON.stringify(err));
        handleSetSnackMessage(
          'Error al intentar registrar el cliente, intentelo de nuevo.',
          setSnackIsActive,
          setSnackMessage,
        )
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
      <ScrollView>
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
          multiline={true}
          value={watch('descripcion')}
          style={styles.txtInput}
          onChangeText={(text) => setValue('descripcion', text)}
        />
      </ScrollView>
      <Button action={handleSubmit(onSubmit)} />
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

export default AddCliente;
