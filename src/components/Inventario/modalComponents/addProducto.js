/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Button from './button';
import {save} from './modalMetodos';
import styles from './modalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import Snackbar from 'react-native-snackbar-component';
import ImagePicker from 'react-native-image-crop-picker';

const defaultValuesForm = {
  nombre: '',
  marca: '',
  cantidad: '',
  proveedor: '',
  descripcion: '',
  precioCosto: '',
  precioVenta: '',
};

const AddProducto = ({navigation, route}) => {
  const paramsBarcode = route.params ? route.params.scannedBarcode.data : '';
  const {register, handleSubmit, watch, errors, reset, setValue} = useForm({
    defaultValues: defaultValuesForm,
  });
  const [snackIsActive, setSnackIsActive] = useState(false);
  const [snackMessage, setSnackMessage] = useState('Algo no anda bien.');
  const [image, setImage] = useState(null);
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    register('image');
    register('nombre', {required: true});
    register('marca');
    register('cantidad');
    register('proveedor');
    register('precioCosto');
    register('precioVenta');
    register('descripcion');
  }, [register, route.params]);

  if (paramsBarcode && barcode !== paramsBarcode) {
    setBarcode(paramsBarcode);
  }

  const handleSetSnackMessage = (message) => {
    setSnackMessage(message);
    setSnackIsActive(true);
  };

  const clean = () => {
    reset();
    setBarcode('');
    setImage(null);
    setValue('image', null);
  };

  const onSubmit = (data) => {
    save(
      'product',
      {
        barcode: barcode,
        image: data.image,
        nombre: data.nombre,
        cantidad: data.cantidad,
        proveedor: data.proveedor,
        precioCosto: data.precioCosto,
        precioVenta: data.precioVenta,
        descripcion: data.descripcion,
        marca: data.marca,
      },
      handleSetSnackMessage,
    )
      .then((res) => {
        var msg = 'El registro se ha guardado con exito.';
        if (res === 0) {
          msg = 'Parece que ya hay un registro con ese nombre.';
        }
        handleSetSnackMessage(msg);
      })
      .catch(() => {
        handleSetSnackMessage(
          '¡Ups! Ha ocurrido un problema al intentar guardar el registro',
        );
      });
    clean();
  };

  const handleSetImage = () => {
    ImagePicker.openPicker({
      cropping: true,
    })
      .then((res) => {
        setImage(res.path);
        setValue('image', res.path);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeImage = () => {
    setImage(null);
    setValue('image', null);
  };

  return (
    <ScrollView style={styles.form}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.setImageButton}
          onPress={handleSetImage}>
          {image ? (
            <TouchableOpacity
              style={styles.imageRemoveButton}
              onPress={removeImage}>
              <Icon name="image-remove" style={styles.imageRemoveIcon} />
            </TouchableOpacity>
          ) : null}
          {image ? (
            <Image source={{uri: image}} style={styles.image} />
          ) : (
            <Icon name="image-plus" style={styles.imageIcon} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.formTitle}>Agregar producto</Text>
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            editable={false}
            placeholder="Codigo de barras"
            style={{...styles.txtInput, flex: 9}}
            value={barcode}
          />
          <Icon
            name="barcode"
            style={styles.Icon}
            onPress={() =>
              navigation.navigate('CamScanner', {
                type: 'getBarcode',
                screen: 'Productos',
              })
            }
          />
        </View>

        <TextInput
          placeholder="Nombre del producto*"
          style={styles.txtInput}
          onChangeText={(text) => setValue('nombre', text)}
          value={`${watch('nombre')}`}
        />
        {errors.nombre && <Text>Este campo es obligatorio</Text>}
        <TextInput
          placeholder="Marca del producto"
          style={styles.txtInput}
          onChangeText={(text) => setValue('marca', text)}
          value={`${watch('marca')}`}
        />
        <TextInput
          placeholder="Cantidad"
          style={styles.txtInput}
          keyboardType="number-pad"
          value={`${watch('cantidad')}`}
          onChangeText={(text) => setValue('cantidad', text)}
        />

        <TextInput
          placeholder="Proveedor"
          style={styles.txtInput}
          value={`${watch('proveedor')}`}
          onChangeText={(text) => setValue('proveedor', text)}
        />

        <TextInput
          placeholder="Precio de costo"
          style={styles.txtInput}
          keyboardType="number-pad"
          value={`${watch('precioCosto')}`}
          onChangeText={(text) => setValue('precioCosto', text)}
        />

        <TextInput
          placeholder="Precio de venta"
          keyboardType="number-pad"
          style={styles.txtInput}
          value={`${watch('precioVenta')}`}
          onChangeText={(text) => setValue('precioVenta', text)}
        />

        <TextInput
          placeholder="Descripción"
          numberOfLines={4}
          multiline={true}
          returnKeyType="none"
          style={[styles.txtInput, {textAlignVertical: 'top'}]}
          value={`${watch('descripcion')}`}
          onChangeText={(text) => setValue('descripcion', text)}
        />
        <Button
          action={handleSubmit(onSubmit)}
          aditionalStyles={{marginBottom: 15}}
        />
      </View>
      <Snackbar
        visible={snackIsActive}
        textMessage={snackMessage}
        actionText="OK"
        actionHandler={() => setSnackIsActive(false)}
        position="top"
      />
    </ScrollView>
  );
};

export default AddProducto;
