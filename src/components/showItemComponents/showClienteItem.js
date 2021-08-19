/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../showInformacionComponents/styles';
import {update} from '../mainFunctions';
import {TextBox} from '../auxComponents';
import {useForm} from 'react-hook-form';

const ShowClienteItem = ({data, editIcon, closeIcon, navigation}) => {
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(editIcon);
  const {register, setValue, getValues} = useForm();

  useEffect(() => {
    register('nombre');
    register('telefono');
    register('email');
    register('descripcion');
  }, []);

  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? closeIcon : editIcon);
  };

  const handleUpdate = (element, value) => {
    if (!value) {
      return;
    }
    Object.defineProperty(data, element, {
      value,
      writable: true,
    });
    update('clientes', data).catch((err) =>
      console.log(`handleUpdate err: ${err}`),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          {edit ? (
            <TextBox
              style={styles.txtInput}
              defaultValue={data.nombre}
              TextContentType="family-name"
              onChangeText={(text) => setValue('nombre', text)}
              onSubmitEditing={() =>
                handleUpdate('nombre', getValues('nombre'))
              }
            />
          ) : (
            <Text style={styles.nombre}>{data.nombre}</Text>
          )}
          <Icon
            name={icon}
            size={28}
            style={styles.editNombre}
            onPress={() => toggleEdit()}
          />
        </View>
        <Text>Número de teléfono</Text>
        <TextBox
          placeholder={!data.telefono ? 'No asignado...' : ''}
          defaultValue={data.telefono ? data.telefono : ''}
          style={styles.txtInput}
          onChangeText={(text) => setValue('telefono', text)}
          onSubmitEditing={() =>
            handleUpdate('telefono', getValues('telefono'))
          }
          keyboardType="phone-pad"
        />
        <Text>Email</Text>
        <TextBox
          placeholder={!data.email ? 'No asignado...' : ''}
          defaultValue={data.email ? data.email : ''}
          style={styles.txtInput}
          onChangeText={(text) => setValue('email', text)}
          onSubmitEditing={() => handleUpdate('email', getValues('email'))}
        />
        <Text>Descripción</Text>
        <TextBox
          placeholder={!data.descripcion ? 'No asignado...' : ''}
          defaultValue={data.descripcion !== '' ? data.descripcion : ''}
          style={styles.txtInput}
          onChangeText={(text) => setValue('descripcion', text)}
          onSubmitEditing={() =>
            handleUpdate('descripcion', getValues('descripcion'))
          }
        />
      </View>
    </View>
  );
};

export default ShowClienteItem;
