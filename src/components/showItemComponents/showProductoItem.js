/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {TextBox, LabeledInput} from '../../utils/components/TextBox';
import DisplayImageComponent from './displayImageComponent';
import ShowImage from './showImage';
import {update} from '../mainFunctions';
import LoadingScreen from '../loadingScreen';
import {useForm} from 'react-hook-form';
import CurrencyFunctions from "../../utils/currencyFunctions";

const ShowProductoItem = ({data, type, navigation, closeIcon, editIcon}) => {
  const {register, getValues, setValue} = useForm();
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(editIcon);
  const [isLoading, setIsLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const collectionKey = type;

  useEffect(() => {
    register('nombre');
    register('descripcion');
    register('marca');
    register('cantidad');
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
    console.log(data);
    await update(collectionKey, data).catch((err) =>
      console.log('async err: ' + err),
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={{flex: 1}}>
      {isLoading ? <LoadingScreen /> : null}
      <DisplayImageComponent
        imageURL={data.imageURL}
        showImage={showImage}
        setShowImage={setShowImage}
      />
      <ShowImage
        data={data}
        setShowImage={setShowImage}
        navigation={navigation}
        collectionKey={collectionKey}
        setIsLoading={setIsLoading}
      />
        <View style={styles.nombreContainer}>
          {edit ? (
            <TextBox
              defaultValue={data.nombre}
              onChangeText={(text) => setValue('nombre', text)}
              onEndEditing={() => handleUpdate('nombre', getValues('nombre'))}
              style={styles.nombreInput}
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
        <View style={styles.form}>
          <View style={styles.quantity}>
            <Text style={styles.quantityBadge}>{data.cantidad}</Text>
            <Text> En inventario</Text>
          </View>
          <LabeledInput
            label="Código"
            editable={false}
            defaultValue={data.barcode}
            style={styles.txtInput}
            placeholder="No asignado..."
          />
          <LabeledInput
            label="Marca"
            placeholder="No asignado"
            defaultValue={data.marca ? data.marca : ''}
            style={styles.txtInput}
            onChangeText={(text) => setValue('marca', text)}
            onEndEditing={() => handleUpdate('marca', getValues('marca'))}
          />
          <LabeledInput
            label="Descripción"
            onEndEditing={() =>
              handleUpdate('descripcion', getValues('descripcion'))
            }
            onChangeText={(text) => setValue('descripcion', text)}
            style={{...styles.txtInput, overflow: 'hidden', maxHeight: 100}}
            multiline={true}
            defaultValue={data.descripcion ? data.descripcion : ''}
            placeholder="No asignado..."
          />
          <LabeledInput
            label="Cantidad"
            onEndEditing={() => handleUpdate('cantidad', getValues('cantidad'))}
            onChangeText={(text) =>
              setValue('cantidad', Number.parseInt(text, 10))
            }
            defaultValue={`${data.cantidad}`}
            placeholder={'0'}
            keyboardType="number-pad"
            style={styles.txtInput}
          />
            <LabeledInput
              label="Precio de costo por unidad"
              onEndEditing={() =>
                handleUpdate('precioCosto', getValues('precioCosto'))
              }
              onChangeText={(text) =>
                setValue('precioCosto', Number.parseInt(text, 10))
              }
              defaultValue={CurrencyFunctions.moneyFormat(data.precioCosto)}
              placeholder={CurrencyFunctions.moneyFormat(0)}
              keyboardType="number-pad"
              style={styles.txtInput}
            />
            <LabeledInput
              label="Precio de venta por unidad"
              onEndEditing={() =>
                handleUpdate('precioVenta', getValues('precioVenta'))
              }
              defaultValue={CurrencyFunctions.moneyFormat(data.precioVenta)}
              placeholder={CurrencyFunctions.moneyFormat(0)}
              onChangeText={(text) =>
                setValue('precioVenta', Number.parseInt(text, 10))
              }
              keyboardType="number-pad"
              style={styles.txtInput}
            />
        </View>
        <Text style={{fontSize: 24}}>
          Ganancia: {CurrencyFunctions.moneyFormat(data.precioVenta - data.precioCosto)}
        </Text>
    </ScrollView>
  );
}

export default ShowProductoItem;
