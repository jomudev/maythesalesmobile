import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {moneyFormat} from '../mainFunctions';
import {
  addProductToCart,
  addServiceToCart,
  addClientToCart,
  addWholesalerToCart,
} from './functions';
import styles from './styles';

const itemStyles = StyleSheet.create({
  title: {fontSize: 12, fontFamily: 'VarelaRound-Regular'},
  subtitle: {
    fontSize: 12,
    color: '#aaa',
    fontFamily: 'VarelaRound-Regular',
    overflow: 'hidden',
    maxHeight: 16,
  },
});

const ProductItem = ({data}) => (
  <TouchableOpacity
    style={styles.itemList}
    onPress={() => addProductToCart(data)}>
    <Text style={itemStyles.title}>
      {`${data.nombre} ${moneyFormat(data.precioVenta)}`}
    </Text>
    <Text style={itemStyles.subtitle} ellipsizeMode="tail">
      {data.marca}
    </Text>
  </TouchableOpacity>
);

const ServiceItem = ({data}) => (
  <TouchableOpacity
    style={styles.itemList}
    onPress={() => addServiceToCart(data)}>
    <Text style={itemStyles.title}>{data.nombre}</Text>
    <Text style={itemStyles.subtitle} ellipsizeMode="tail">
      {moneyFormat(data.precioVenta)}
      {data.descripcion ? ` ${data.descripcion}` : ' '}
    </Text>
  </TouchableOpacity>
);

const ClientItem = ({data}) => (
  <TouchableOpacity
    style={styles.itemList}
    onPress={() => addClientToCart(data)}>
    <Text style={itemStyles.title}>{data.nombre}</Text>
    {data.telefono || data.email ? (
      <Text style={itemStyles.subtitle} ellipsizeMode="tail">
        {data.telefono ? data.telefono : ''}
        {data.telefono && data.email ? ' - ' : ''}
        {data.email ? data.email : ''}
      </Text>
    ) : null}
  </TouchableOpacity>
);

const WholesalerItem = ({data, index}) => (
  <TouchableOpacity
    style={styles.itemList}
    onPress={() => addWholesalerToCart(data)}>
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

export {ProductItem, ServiceItem, ClientItem, WholesalerItem};
