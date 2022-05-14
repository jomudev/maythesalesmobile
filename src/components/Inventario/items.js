/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, ToastAndroid, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moneyFormat} from '../mainFunctions';
import {
  addProductToCart,
  addServiceToCart,
  addClientToCart,
  addWholesalerToCart,
} from './functions';
import styles from './styles';
import defaultImage from '../../assets/AdditionalMedia/productDefaultImage.png';
import store from '../../../store';
import {
  removeProductFromCart,
  removeServiceFromCart,
} from '../Cart/cartComponents/functions';

const defaultImageURI = Image.resolveAssetSource(defaultImage).uri;

const elementIsSelected = (storeCartElements, id) => {
  if (storeCartElements == undefined) {
    return false;
  }
  let isInCart = storeCartElements.filter((element) => element.id === id);
  isInCart = isInCart[0];
  return isInCart ? true : false;
};

const removeFromCart = (type, id, setIsSelected) => {
  switch (type) {
    case 'product':
      removeProductFromCart(id);
      break;
    case 'service':
      removeServiceFromCart(id);
      break;
    default:
      break;
  }
  setIsSelected(false);
};

const addToCart = (type, id, setIsSelected) => {
  switch (type) {
    case 'product':
      addProductToCart(id);
      break;
    case 'service':
      addServiceToCart(id);
      break;
    default:
      break;
  }
  setIsSelected(true);
};

const ProductItem = ({data}) => {
  const type = 'product';
  const [isSelected, setIsSelected] = useState(
    elementIsSelected(store.getState().cartProducts, data.id),
  );

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setIsSelected(elementIsSelected(store.getState().cartProducts, data.id));
    }
    );
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <TouchableOpacity
      style={[styles.itemList, isSelected ? styles.selectedItemList : null]}
      onPress={() =>
        isSelected
          ? removeFromCart(type, data.id, setIsSelected)
          : addToCart(type, data, setIsSelected)
      }>
      <FastImage
        style={styles.itemImage}
        source={{
          uri: data.imageURL ? data.imageURL : defaultImageURI,
          priority: FastImage.priority.high,
        }}
      />
      <View style={styles.itemDescription}>
        <Text style={styles.itemName} ellipsizeMode='tail' numberOfLines={1}>
          {data.nombre}
        </Text>
        <Text style={styles.itemPrice}>
          {moneyFormat(data.precioVenta)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ServiceItem = ({data}) => {
  const type = 'service';
  const [isSelected, setIsSelected] = useState(
    elementIsSelected(store.getState().cartServices, data.id),
  );

  return (
    <TouchableOpacity
      style={[
        {...styles.itemList, flexDirection: 'column'},
        isSelected ? styles.selectedItemList : null,
      ]}
      onPress={() =>
        isSelected
          ? removeFromCart(type, data.id, setIsSelected)
          : addToCart(type, data, setIsSelected)
      }>
      <Text style={itemStyles.title}>{data.nombre}</Text>
      <Text style={itemStyles.subtitle}>
        {moneyFormat(data.precioVenta)}
        {data.descripcion && ' '}
      </Text>
    </TouchableOpacity>
  );
};

const ClientItem = ({data}) => {
  const storeClient = store.getState().cartClient;
  const [isSelected, setIsSelected] = useState(
    storeClient ? storeClient.id === data.id : false,
  );

  const cartClient = (type) => {
    if (type === 'set') {
    const cartWholesaler = store.getState().cartWholesaler;
      if (cartWholesaler) {
        ToastAndroid.show("ya existe un cliente mayorista en el carro de ventas.", ToastAndroid.LONG);
        return;
      }
      addClientToCart(data);
      setIsSelected(true);
    } else if (type === 'remove') {
      addClientToCart(null);
      setIsSelected(false);
    }
  };

  return (
    <TouchableOpacity
      style={[
        {
          ...styles.itemList,
          flexDirection: 'column',
          width: 200,
          alignItems: 'flex-start',
        },
        isSelected ? styles.selectedItemList : null,
      ]}
      onPress={() => (isSelected ? cartClient('remove') : cartClient('set'))}>
      <Text style={itemStyles.title}>{data.nombre}</Text>
      {data.telefono || data.email ? (
        <Text style={itemStyles.subtitle} ellipsizeMode="tail">
          {data.telefono ? data.telefono : ''}{' '}
          {data.telefono && data.email ? ' - ' : ''}
          {data.email ? data.email : ''}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const WholesalerItem = ({data}) => {
  const storeWholesaler = store.getState().cartWholesaler;
  const [isSelected, setIsSelected] = useState(
    storeWholesaler ? storeWholesaler.id === data.id : false,
  );

  const cartWholesaler = (type) => {
    if (type === 'set') {
      const cartClient = store.getState().cartClient;
    if (cartClient) {
      ToastAndroid.show("ya existe un cliente común en el carro de ventas.", ToastAndroid.LONG);
      return;
    }
      addWholesalerToCart(data);
      setIsSelected(true);
    } else if (type === 'remove') {
      addWholesalerToCart(null);
      setIsSelected(false);
    }
  };

  return (
    <TouchableOpacity
      style={[
        {
          ...styles.itemList,
          flexDirection: 'column',
          width: 200,
          alignItems: 'flex-start',
        },
        isSelected ? styles.selectedItemList : null,
      ]}
      onPress={() =>
        isSelected ? cartWholesaler('remove') : cartWholesaler('set')
      }>
      <Text style={itemStyles.title}>{data.nombre}</Text>
      {data.telefono || data.email ? (
        <Text style={itemStyles.subtitle} ellipsizeMode="tail">
          {data.telefono ? data.telefono : ''}{' '}
          {data.telefono && data.email ? ' - ' : ''}{' '}
          {data.email ? data.email : ''}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export {ProductItem, ServiceItem, ClientItem, WholesalerItem};
