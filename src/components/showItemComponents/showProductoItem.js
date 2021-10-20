/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../showInformacionComponents/styles';
import {TextBox} from '../auxComponents';
import DisplayImageComponent from './displayImageComponent';
import ShowImage from './showImage';
import {update, moneyFormat} from '../mainFunctions';
import LoadingScreen from '../loadingScreen';
import {useForm} from 'react-hook-form';

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
    register('precioMayoreo');
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
    <ScrollView style={styles.container}>
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
      <View style={styles.form}>
        <View style={styles.nombreContainer}>
          {edit ? (
            <TextBox
              defaultValue={data.nombre}
              onChangeText={(text) => setValue('nombre', text)}
              onEndEditing={() => handleUpdate('nombre', getValues('nombre'))}
              style={{...styles.txtInput, ...styles.nombre}}
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
        <View style={styles.quantity}>
          {data.cantidad > 0 ? (
            <>
              <Text style={styles.quantityBadge}>{data.cantidad}</Text>
              <Text> En inventario</Text>
            </>
          ) : (
            <Text>Inexistente en inventario o no asignado</Text>
          )}
        </View>
        <Text>Codigo</Text>
        <TextBox
          editable={false}
          defaultValue={data.barcode}
          placeholder="No asignado..."
        />
        <Text>Marca</Text>
        <TextBox
          placeholder="No asignado"
          defaultValue={data.marca ? data.marca : ''}
          style={styles.txtInput}
          onChangeText={(text) => setValue('marca', text)}
          onEndEditing={() => handleUpdate('marca', getValues('marca'))}
        />
        <Text>Descripción</Text>
        <TextBox
          onEndEditing={() =>
            handleUpdate('descripcion', getValues('descripcion'))
          }
          onChangeText={(text) => setValue('descripcion', text)}
          style={{...styles.txtInput, overflow: 'hidden', maxHeight: 100}}
          multiline={true}
          defaultValue={data.descripcion ? data.descripcion : ''}
          placeholder="No asignado..."
        />
        <Text>Cantidad</Text>
        <TextBox
          onEndEditing={() => handleUpdate('cantidad', getValues('cantidad'))}
          onChangeText={(text) =>
            setValue('cantidad', Number.parseInt(text, 10))
          }
          placeholder={`${data.cantidad}`}
          keyboardType="number-pad"
          style={styles.txtInput}
        />
        <Text>Precio de costo por unidad</Text>
        <View style={styles.priceContainer}>
          <TextBox
            onEndEditing={() =>
              handleUpdate('precioCosto', getValues('precioCosto'))
            }
            onChangeText={(text) =>
              setValue('precioCosto', Number.parseInt(text, 10))
            }
            placeholder={moneyFormat(data.precioCosto)}
            keyboardType="number-pad"
            style={styles.txtInput}
          />
        </View>
        <Text>Precio de venta por unidad</Text>
        <View style={styles.priceContainer}>
          <TextBox
            onEndEditing={() =>
              handleUpdate('precioVenta', getValues('precioVenta'))
            }
            placeholder={moneyFormat(data.precioVenta)}
            onChangeText={(text) =>
              setValue('precioVenta', Number.parseInt(text, 10))
            }
            keyboardType="number-pad"
            style={styles.txtInput}
          />
        </View>
        <Text>Precio de venta al por mayor</Text>
        <View style={styles.priceContainer}>
          <TextBox
            onEndEditing={() =>
              handleUpdate('precioMayoreo', getValues('precioMayoreo'))
            }
            placeholder={moneyFormat(data.precioMayoreo)}
            onChangeText={(text) =>
              setValue('precioMayoreo', Number.parseInt(text, 10))
            }
            keyboardType="number-pad"
            style={styles.txtInput}
          />
        </View>
        <Text style={{fontSize: 24}}>
          Ganancia: {moneyFormat(data.precioVenta - data.precioCosto)}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ShowProductoItem;
