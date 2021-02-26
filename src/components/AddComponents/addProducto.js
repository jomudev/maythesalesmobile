/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {TextBox, Button} from '../auxComponents';
import {save} from './functions';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import Snackbar from 'react-native-snackbar-component';
import ImagePicker from 'react-native-image-crop-picker';
import {handleSetSnackMessage} from '../mainFunctions';
import LoadingScreen from '../loadingScreen';

const defaultValuesForm = {
  nombre: '',
  marca: '',
  cantidad: '',
  proveedor: '',
  descripcion: '',
  precioCosto: '',
  precioVenta: '',
  precioMayoreo: '',
};

const AddProducto = ({navigation, route}) => {
  const paramsBarcode = route.params ? route.params.scannedBarcode.data : '';
  const {register, handleSubmit, errors, watch, reset, setValue} = useForm({
    defaultValues: defaultValuesForm,
  });
  const [snackIsActive, setSnackIsActive] = useState(false);
  const [snackMessage, setSnackMessage] = useState('Algo no anda bien.');
  const [image, setImage] = useState(null);
  const [barcode, setBarcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    register('image');
    register('nombre', {required: true});
    register('marca');
    register('cantidad');
    register('proveedor');
    register('precioCosto');
    register('precioVenta');
    register('precioMayoreo');
    register('descripcion');
  }, [register, route.params]);

  if (paramsBarcode && barcode !== paramsBarcode) {
    setBarcode(paramsBarcode);
  }

  const clean = () => {
    reset();
    setBarcode('');
    setImage(null);
    setValue('image', null);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    save('product', {
      ...data,
      barcode: barcode,
    })
      .then(() => {
        handleSetSnackMessage(
          'El registro se ha guardado con exito.',
          setSnackIsActive,
          setSnackMessage,
        );
        setIsLoading(false);
      })
      .catch(() => {
        handleSetSnackMessage(
          '¡Ups! Ha ocurrido un problema al intentar guardar el registro',
          setSnackIsActive,
          setSnackMessage,
        );
        setIsLoading(false);
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
    <>
      {isLoading ? <LoadingScreen /> : null}
      <View style={styles.form}>
        <ScrollView>
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
          <View style={{flexDirection: 'row'}}>
            <TextBox
              editable={false}
              placeholder="Codigo de barras"
              style={{...styles.txtInput, flex: 9}}
              value={barcode}
            />
            <Icon
              name="barcode-scan"
              style={styles.Icon}
              onPress={() =>
                navigation.navigate('CamScanner', {
                  type: 'getBarcode',
                  screen: 'Productos',
                })
              }
            />
          </View>
          <TextBox
            placeholder="Nombre del producto*"
            style={styles.txtInput}
            onChangeText={(text) => setValue('nombre', text)}
            autoCapitalize="words"
            value={watch('nombre')}
          />
          {errors.nombre && <Text>Este campo es obligatorio</Text>}
          <TextBox
            placeholder="Marca del producto"
            style={styles.txtInput}
            onChangeText={(text) => setValue('marca', text)}
            value={watch('marca')}
          />
          <TextBox
            placeholder="Cantidad"
            style={styles.txtInput}
            onChangeText={(text) => setValue('cantidad', text)}
            value={watch('cantidad')}
          />
          <TextBox
            placeholder="Precio de costo"
            style={styles.txtInput}
            keyboardType="number-pad"
            onChangeText={(text) => setValue('precioCosto', text)}
            value={watch('precioCosto')}
          />

          <TextBox
            placeholder="Precio de venta"
            keyboardType="number-pad"
            style={styles.txtInput}
            onChangeText={(text) => setValue('precioVenta', text)}
            value={watch('precioVenta')}
          />

          <TextBox
            placeholder="Precio de para mayoristas"
            keyboardType="number-pad"
            style={styles.txtInput}
            onChangeText={(text) => setValue('precioMayoreo', text)}
            value={watch('mayorista')}
          />

          <TextBox
            placeholder="Descripción"
            numberOfLines={4}
            multiline={true}
            returnKeyType="none"
            style={[styles.txtInput, {textAlignVertical: 'top'}]}
            onChangeText={(text) => setValue('descripcion', text)}
            value={watch('descripcion')}
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
    </>
  );
};

export default AddProducto;
