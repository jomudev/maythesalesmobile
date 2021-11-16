/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {TextBox, Button} from '../auxComponents';
import {save} from './functions';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingScreen from '../loadingScreen';

const initialFormValues = {
  nombre: '',
  marca: '',
  cantidad: '',
  proveedor: '',
  descripcion: '',
  precioCosto: '',
  precioVenta: '',
  precioMayoreo: '',
  imageURL: '',
};

const AddProducto = ({navigation, route}) => {
  const paramsBarcode = route.params ? route.params.scannedBarcode.data : '';
  const {register, handleSubmit, errors, watch, reset, setValue} = useForm({
    defaultValues: initialFormValues,
    mode: 'onSubmit',
    criteriaMode: 'firstError',
  });
  const [imageURL, setImageURL] = useState(null);
  const [barcode, setBarcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    register('imageURL');
    register('nombre', {required: true});
    register('marca');
    register('cantidad');
    register('proveedor');
    register('precioCosto');
    register('precioVenta');
    register('precioMayoreo');
    register('descripcion');
  }, []);

  if (paramsBarcode && barcode !== paramsBarcode) {
    setBarcode(paramsBarcode);
  }

  const clean = () => {
    reset({
      nombre: '',
      marca: '',
      cantidad: '',
      proveedor: '',
      descripcion: '',
      precioCosto: '',
      precioVenta: '',
      precioMayoreo: '',
      imageURL: '',
    });
    setBarcode('');
    setImageURL(null);
    setValue('imageURL', null);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    save('product', {
      ...data,
      barcode,
    })
      .then(() => {
        ToastAndroid.show(
          'El registro se ha guardado con exito.',
          ToastAndroid.SHORT,
        );
        setIsLoading(false);
        clean();
      })
      .catch((err) => {
        setIsLoading(false);
        ToastAndroid.show(
          '¡Ups! Ha ocurrido un problema al intentar guardar el registro',
          ToastAndroid.SHORT,
        );
        console.log('error trying save service ' + JSON.stringify(err));
      });
  };

  const handleSetImage = () => {
    ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then((pickerResponse) => {
        setImageURL(pickerResponse.path);
        setValue('imageURL', pickerResponse.path);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeImage = () => {
    setImageURL(null);
    setValue('imageURL', null);
  };

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <View style={styles.form}>
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{alignItems: 'center'}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              style={styles.setImageButton}
              onPress={handleSetImage}>
              {imageURL ? (
                <TouchableOpacity
                  style={styles.imageRemoveButton}
                  onPress={removeImage}>
                  <Icon name="image-remove" style={styles.imageRemoveIcon} />
                </TouchableOpacity>
              ) : null}
              {imageURL ? (
                <Image source={{uri: imageURL}} style={styles.image} />
              ) : (
                <Icon name="image-plus" style={styles.imageIcon} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', padding: 8}}>
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
            placeholder="Precio para mayoristas"
            keyboardType="number-pad"
            style={styles.txtInput}
            onChangeText={(text) => setValue('precioMayoreo', text)}
            value={watch('precioMayoreo')}
          />

          <TextBox
            placeholder="Descripción"
            numberOfLines={4}
            multiline={true}
            returnKeyType="none"
            style={styles.txtInput}
            isTextArea={true}
            onChangeText={(text) => setValue('descripcion', text)}
            value={watch('descripcion')}
          />
          <Button action={handleSubmit(onSubmit)} />
        </ScrollView>
      </View>
    </>
  );
};

export default AddProducto;
