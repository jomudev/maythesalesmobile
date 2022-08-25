/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, ToastAndroid,Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import defaultImage from '../../assets/AdditionalMedia/productDefaultImage.png';
import store from '../../../store';
import {Row, Column} from '../../utils/components/layout/table';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from '../../utils/share';

const defaultImageURI = Image.resolveAssetSource(defaultImage).uri;

const elementIsSelected = (storeCartElements, id) => {
  if (storeCartElements == undefined) {
    return false;
  }
  let isInCart = storeCartElements.filter((element) => element.id === id);
  isInCart = isInCart[0];
  return isInCart ? true : false;
}; 

const ProductItem = ({data}) => {
  const cart = store.getState().cart;
  const type = 'productos';
  const [isSelected, setIsSelected] = useState(
    elementIsSelected(cart.products, data.id),
  );

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setIsSelected(elementIsSelected(cart.products, data.id));
    }
    );
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <TouchableOpacity
      style={[styles.itemList, isSelected ? styles.selectedItemList : null]}
      onPress={() => {
        if (isSelected) {
          cart.removeTo(type, data.id);
          setIsSelected(false);
        } else {
          cart.addTo(type, data);
          setIsSelected(true);
        }
      }
      }>
      <FastImage
        style={styles.itemImage}
        source={{
          uri: data.imageURL ? data.imageURL : defaultImageURI,
          priority: FastImage.priority.high,
        }}
      />
      <View style={styles.itemDescription}>
      <Row>
        <Column>
          <Text style={styles.itemName} ellipsizeMode='tail' numberOfLines={1}>
            {data.nombre}
          </Text>
        </Column>
        <Column align="right">
          <TouchableOpacity onPress={() => Share.product(data, "detailsAndImage")} style={{padding: 10}}>
            <Icon name="share-variant" size={18} color="#101e5a" />
          </TouchableOpacity>
        </Column>
      </Row>
      <Row>
        <Column>
          <Text style={styles.itemPrice}>
            {data.getPrecioVenta()}
          </Text>
        </Column>
      </Row>
      </View>
    </TouchableOpacity>
  );
};

const ServiceItem = ({data}) => {
  const cart = () => store.getState().cart;
  const type = 'servicios';
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
          ? cart.addTo(type, data.id, setIsSelected)
          : cart.addTo(type, data, setIsSelected)
      }>
      <Text style={itemStyles.title}>{data.nombre}</Text>
      <Text style={itemStyles.subtitle}>
        {data.getPrecioVenta()}
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
