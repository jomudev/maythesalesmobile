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
import {useNavigation} from "@react-navigation/native";
import {Button} from '../auxComponents';
import {LabeledInput, TextBox} from '../../utils/components/TextBox';
import {save} from './functions';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingScreen from '../loadingScreen';
import CamScanner from '../CamScanner';

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

const AddProducto = () => {
  const navigation = useNavigation();
  const {register, handleSubmit, errors, watch, setValue} = useForm({
    defaultValues: initialFormValues,
    mode: 'onSubmit',
    criteriaMode: 'firstError',
  });
  const [imageURL, setImageURL] = useState(null);
  const [barcode, setBarcode] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setValue('imageURL', '')
    setValue('nombre', '')
    setValue('marca', '')
    setValue('cantidad', '')
    setValue('proveedor', '')
    setValue('precioCosto', '')
    setValue('precioVenta', '')
    setValue('precioMayoreo', '')
    setValue('descripcion', '')
    setBarcode('')
    setImageURL(null)
  }

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

  const clean = () => {
    reset();
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

  const getBarcode = (barcode) => {
    setBarcode(barcode);
    setShowScanner(false);
  }

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <View style={styles.form}>
        <ScrollView>
          <View style={styles.imageContainer}>
          {
            showScanner ? <CamScanner handleReturn={getBarcode} /> 
            : (
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
            )
          }
          </View>
          <View style={styles.barcodeContainer}>
            <View style={styles.flex9}>
              <LabeledInput
                editable={false}
                label="Codigo de barras"
                style={styles.txtInput}
                value={barcode}
              />
            </View>
            <View style={styles.flex2}>
              <Icon
                name="barcode-scan"
                style={styles.Icon}
                onPress={() => setShowScanner(!showScanner)}
              />
            </View>
          </View>
          <LabeledInput
            label="Nombre del producto*"
            style={styles.txtInput}
            onChangeText={(text) => setValue('nombre', text)}
            autoCapitalize="words"
            value={watch('nombre')}
          />
          {errors.nombre && <Text>Este campo es obligatorio</Text>}
          <LabeledInput
            label="Marca del producto"
            style={styles.txtInput}
            onChangeText={(text) => setValue('marca', text)}
            value={watch('marca')}
          />
          <LabeledInput
             
            label="Cantidad"
            style={styles.txtInput}
            onChangeText={(text) => setValue('cantidad', text)}
            value={watch('cantidad')}
          />
          <LabeledInput
            label="Precio de costo"
            style={styles.txtInput}
            keyboardType="number-pad"
            onChangeText={(text) => setValue('precioCosto', text)}
            value={watch('precioCosto')}
          />

          <LabeledInput
            label="Precio de venta"
            keyboardType="number-pad"
            style={styles.txtInput}
            onChangeText={(text) => setValue('precioVenta', text)}
            value={watch('precioVenta')}
          />

          <LabeledInput
            label="Descripción"
            numberOfLines={4}
            multiline={true}
            returnKeyType="none"
            style={styles.txtAreaInput}
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
