/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text, 
  View, 
  ToastAndroid, 
  ScrollView, 
  Image, 
  TouchableOpacity
} from 'react-native';
import {TextBox, Button} from '../auxComponents';
import {save} from './functions';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingScreen from '../loadingScreen';
import CamScanner from '../CamScanner';

const initialFormValues = {
  nombre: '',
  barcode: '',
  marca: '',
  cantidad: 0,
  proveedor: '',
  descripcion: '',
  precioCosto: 0,
  precioVenta: 0,
  previoMayoreo: 0,
};

function AddServicio () {
  const {register, handleSubmit, errors, watch, setValue} = useForm({
    defaultValues: initialFormValues,
    mode: 'onSubmit',
    criteriaMode: 'firstError',
  });
  const [image, setImage] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    register('image');
    register('barcode');
    register('nombre', {required: true});
    register('categoria');
    register('marca');
    register('cantidad');
    register('proveedor');
    register('precioCosto');
    register('precioVenta');
    register('precioMayoreo');  
    register('descripcion');
  }, []);

  const getBarcode = (barcode) => {
    setValue('barcode', barcode);
  }

  const reset = () => {
    setValue('image', '');
    setValue('barcode', '');
    setValue('nombre', '');
    setValue('marca', '');
    setValue('cantidad', '');
    setValue('proveedor', '');
    setValue('precioCosto', '');
    setValue('precioVenta', '');
    setValue('precioMayoreo', '');
    setValue('descripcion', '');
    setImage(null);
  }
  
  const onSubmit = (data) => {
    setIsLoading(true);
    save('service', data)
      .then(() => {
        ToastAndroid.show(
          'El registro se ha guardado con exito.',
          ToastAndroid.SHORT,
        );
        setIsLoading(false);
        reset();
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
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.imageContainer}>
          {
            showScanner ? <CamScanner handleReturn={getBarcode} />
            : (
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
              )
          }
          </View>
        <View style={{flexDirection: 'row', padding: 8}}>
          <TextBox
            editable={false}
            placeholder="Codigo de barras"
            style={{...styles.txtInput, flex: 9}}
            value={watch('barcode')}
          />
          <Icon
            name="barcode"
            style={styles.Icon}
            onPress={() => setShowScanner(!showScanner)}
          />
        </View>
        <TextBox
          placeholder="Nombre del servicio*"
          style={styles.txtInput}
          onChangeText={(text) => setValue('nombre', text)}
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
          keyboardType="number-pad"
          onChangeText={(text) => setValue('cantidad', text)}
          value={watch('cantidad')}
        />

        <TextBox
          placeholder="Proveedor"
          style={styles.txtInput}
          onChangeText={(text) => setValue('proveedor', text)}
          value={watch('proveedor')}
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
          placeholder="Precio de Mayoreo"
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

export default AddServicio;
