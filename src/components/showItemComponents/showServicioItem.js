/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../showInformacionComponents/styles';
import {update, moneyFormat, deleteFromInventory} from '../mainFunctions';
import {useForm} from 'react-hook-form';
import {TextBox, Button} from '../auxComponents';

const ShowServicioItem = ({data, editIcon, closeIcon, navigation}) => {
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(editIcon);
  const {register, setValue, getValues} = useForm();
  const serviceName = useRef();

  useEffect(() => {
    register('nombre');
    register('marca');
    register('proveedor');
    register('cantidad');
    register('descripcion');
    register('precioCosto');
    register('precioVenta');
    register('precioMayoreo');
  });

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
    update('servicios', data).catch((err) => console('async err: ' + err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
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
        <Text>Descripción</Text>
        <TextBox
          placeholder="No asignado..."
          defaultValue={data.descripcion ? data.descripcion : ''}
          onChangeText={(text) => setValue('descripcion', text)}
          onEndEditing={() =>
            handleUpdate('descripcion', getValues('descripcion'))
          }
          style={styles.txtInput}
        />
        <Text>Precio de costo por unidad</Text>
        <TextBox
          placeholder={moneyFormat(data.precioCosto)}
          onChangeText={(text) => setValue('precioCosto', text)}
          onEndEditing={() =>
            handleUpdate('precioCosto', getValues('precioCosto'))
          }
          keyboardType="phone-pad"
          style={styles.txtInput}
        />
        <Text>Precio de venta por unidad</Text>
        <TextBox
          placeholder={moneyFormat(data.precioVenta)}
          onChangeText={(text) => setValue('precioVenta', text)}
          onEndEditing={() =>
            handleUpdate('precioVenta', getValues('precioVenta'))
          }
          keyboardType="phone-pad"
          style={styles.txtInput}
        />
        <Text>Precio de venta por mayoreo</Text>
        <TextBox
          placeholder={moneyFormat(data.precioMayoreo)}
          onChangeText={(text) => setValue('precioMayoreo', text)}
          onEndEditing={() =>
            handleUpdate('precioMayoreo', getValues('precioMayoreo'))
          }
          keyboardType="phone-pad"
          style={styles.txtInput}
        />
        <Text style={{fontSize: 24}}>
          Ganancias:
          {' ' + moneyFormat(data.precioVenta - data.precioCosto)}
        </Text>
        <Button
          text="Eliminar del inventario"
          styles={{
            backgroundColor: '#ff4444',
          }}
          action={() => {
            deleteFromInventory('servicios', data.id)
              .then(() => console.log('registro eliminado con exito'))
              .catch((err) => {
                console.warn(err);
              });
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default ShowServicioItem;
