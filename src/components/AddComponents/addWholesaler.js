import React, {useEffect, useState} from 'react';
import {View, ScrollView, ToastAndroid} from 'react-native';
import styles from './styles';
import {TextBox, Button} from '../auxComponents';
import {useForm} from 'react-hook-form';
import {save} from './functions';
import LoadingScreen from '../loadingScreen';

const AddWholesaler = () => {
  const {register, handleSubmit, watch, setValue, reset} = useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    register('nombre', {required: true});
    register('email');
    register('telefono');
    register('descripcion');
  }, []);

  const onSubmit = (data) => {
    const {nombre, email, telefono, descripcion} = data;
    if (!nombre || 
      !email || 
      !telefono || 
      !descripcion || 
      !nombre.length || 
      !email.length || 
      !telefono || 
      !descripcion.length
      ) {
        ToastAndroid.show(
          'Rellena los campos que son obligatorios, estos están marcados con un asterisco (*).',
          ToastAndroid.LONG,
        );
        setIsLoading(false);
        return null;
    }
    setIsLoading(true);
    save('wholesaler', data)
      .then(() => {
        ToastAndroid.show(
          'El registro se ha guardado con éxito.',
          ToastAndroid.SHORT,
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
      <ScrollView style={{width: '100%'}}>
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
          numberOfLines={4}
          multiline={true}
          isTextArea={true}
          onChangeText={(text) => setValue('descripcion', text)}
          value={watch('descripcion')}
        />
      </ScrollView>
      <Button action={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AddWholesaler;
