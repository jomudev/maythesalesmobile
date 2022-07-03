/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../showInformacionComponents/styles';
import {update} from '../mainFunctions';
import CurrencyFunctions from '../../utils/currencyFunctions';
import {useForm} from 'react-hook-form';
import {TextBox, LabeledInput} from '../../utils/components/TextBox';

const ShowServicioItem = ({data, editIcon, closeIcon}) => {
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(editIcon);
  const {register, setValue, getValues} = useForm();

  useEffect(() => {
    register('nombre');
    register('marca');
    register('proveedor');
    register('cantidad');
    register('descripcion');
    register('precioCosto');
    register('precioVenta');
  }, []);

  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? closeIcon : editIcon);
  };

  const handleUpdate = async (element, value) => {
    if (!value) {
      return;
    }
    Object.defineProperty(data, element, {
      value,
      writable: true,
    });
    update('servicios', data).catch((err) => console('update property err: ' + err));
  };

  return (
    <View style={styles.container}>
        <View style={styles.nombreContainer}>
          {edit ? (
            <TextBox
              placeholder={data.nombre}
              defaultValue={data.nombre}
              onChangeText={(text) => setValue('nombre', text)}
              style={styles.nombre}
              onBlur={toggleEdit}
              onEndEditing={() => handleUpdate('nombre', getValues('nombre'))}
            />
          ) : (
            <Text style={styles.nombre}>{data.nombre}</Text>
          )}
          <Icon
            name={icon}
            size={28}
            style={styles.editNombre}
            onPress={toggleEdit}
          />
        </View>
        <LabeledInput
          label="Descripción"
          placeholder="No asignado..."
          defaultValue={data.descripcion ? data.descripcion : ''}
          onChangeText={(text) => setValue('descripcion', text)}
          onEndEditing={() =>
            handleUpdate('descripcion', getValues('descripcion'))
          }
          style={styles.txtInput}
        />
        <Text>Precio de costo por unidad</Text>
        <LabeledInput
          label="Precio de costo por unidad"
          defaultValue={CurrencyFunctions.moneyFormat(data.precioCosto)}
          placeholder={CurrencyFunctions.moneyFormat(0)}
          onChangeText={(text) => setValue('precioCosto', text)}
          onEndEditing={() =>
            handleUpdate('precioCosto', getValues('precioCosto'))
          }
          keyboardType="phone-pad"
          style={styles.txtInput}
        />
        <Text>Precio de venta por unidad</Text>
        <LabeledInput
          label="Precio de venta por unidad"
          defaultValue={CurrencyFunctions.moneyFormat(data.precioVenta)}
          placeholder={CurrencyFunctions.moneyFormat(0)}
          onChangeText={(text) => setValue('precioVenta', text)}
          onEndEditing={() =>
            handleUpdate('precioVenta', getValues('precioVenta'))
          }
          keyboardType="phone-pad"
          style={styles.txtInput}
        />
        <Text style={{fontSize: 24}}>
          Ganancias:
          {' ' + CurrencyFunctions.moneyFormat(data.ganancias)}
        </Text>
    </View>
  );
};

export default ShowServicioItem;
