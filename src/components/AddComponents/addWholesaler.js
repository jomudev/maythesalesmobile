import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import {TextBox, Button} from '../auxComponents';
import {useForm} from 'react-hook-form';
import {save} from './functions';
import {handleSetSnackMessage} from '../mainFunctions';
import Snackbar from 'react-native-snackbar-component';
import LoadingScreen from '../loadingScreen';

const AddWholesaler = () => {
  const {register, handleSubmit, watch, setValue, reset} = useForm();
  const [snackIsActive, setSnackIsActive] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    register('nombre');
    register('email');
    register('telefono');
    register('descripcion');
  }, [register]);

  const onSubmit = (data) => {
    setIsLoading(true);
    save('wholesaler', data)
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
        console.log('err saving client ' + JSON.stringify(err));
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.form}>
      {isLoading ? <LoadingScreen /> : null}
      <ScrollView>
        <TextBox
          placeholder="Nombre*"
          autoCapitalize="words"
          onChangeText={(text) => setValue('nombre', text)}
          value={watch('nombre')}
        />
        <TextBox
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => setValue('email', text)}
          value={watch('email')}
        />
        <TextBox
          placeholder="Teléfono"
          keyboardType="phone-pad"
          onChangeText={(text) => setValue('telefono', text)}
          value={watch('telefono')}
        />
        <TextBox
          placeholder="Descripción"
          multiline={true}
          onChangeText={(text) => setValue('descripcion', text)}
          value={watch('descripcion')}
        />
        <Button action={handleSubmit(onSubmit)} />
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

export default AddWholesaler;
