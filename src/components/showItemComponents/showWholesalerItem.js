import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../showInformacionComponents/styles';
import {update, phoneFormat} from '../mainFunctions';
import {useForm} from 'react-hook-form';
import {TextBox} from '../auxComponents';

const ShowWholesalerItem = ({data, closeIcon, editIcon}) => {
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(editIcon);
  const {register, setValue, getValues} = useForm();
  useEffect(() => {
    register('nombre');
    register('telefono');
    register('email');
    register('descripcion');
  });

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
    update('mayoristas', data).catch((err) => console.log('async err: ' + err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.nombreContainer}>
          {edit ? (
            <TextBox
              defaultValue={data.nombre}
              onChangeText={(text) => setValue('nombre', text)}
              textContentType="familyName"
              style={{...styles.txtInput, ...styles.nombre}}
              onEndEditing={() => handleUpdate('nombre', getValues('nombre'))}
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
          placeholder="No asignado..."
          defaultValue={data.telefono ? phoneFormat(data.telefono) : ''}
          style={styles.txtInput}
          keyboardType="phone-pad"
          onChangeText={(text) => setValue('telefono', text)}
          onEndEditing={() => handleUpdate('telefono', getValues('telefono'))}
        />
        <Text>Email</Text>
        <TextBox
          placeholder="No asignado..."
          defaultValue={data.email ? data.email : ''}
          style={styles.txtInput}
          underlineColorAndroid={'#ccc'}
          onChangeText={(text) => setValue('email', text)}
          onEndEditing={() => handleUpdate('email', getValues('email'))}
        />
        <Text>Descripción</Text>
        <TextBox
          placeholder="No asignado..."
          defaultValue={data.descripcion ? data.descripcion : ''}
          style={styles.txtInput}
          onChangeText={(text) => setValue('descripcion', text)}
          onEndEditing={() =>
            handleUpdate('descripcion', getValues('descripcion'))
          }
        />
      </View>
    </View>
  );
};

export default ShowWholesalerItem;
