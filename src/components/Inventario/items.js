import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {moneyFormat} from '../mainFunctions';
import styles from './styles';
import store from '../../../store';

const itemStyles = StyleSheet.create({
  title: {fontSize: 16, fontWeight: 'bold'},
  subtitle: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: 'bold',
    overflow: 'hidden',
    height: 30,
  },
});

const ProductItem = ({data, index}) => (
  <TouchableOpacity
    key={data + index}
    style={styles.itemList}
    onPress={() => {
      store.dispatch({
        type: 'ADD_PRODUCT_TO_CART',
        product: data,
      });
    }}>
    <Text style={itemStyles.title}>
      {`${data.nombre} ${moneyFormat(data.precioVenta)}`}
    </Text>
    {data.descripcion ? (
      <Text style={itemStyles.subtitle}>{data.marca}</Text>
    ) : null}
  </TouchableOpacity>
);

const ServiceItem = ({data, index}) => (
  <TouchableOpacity
    key={data + index}
    style={styles.itemList}
    onPress={() => {
      store.dispatch({
        type: 'ADD_SERVICE_TO_CART',
        service: data,
      });
    }}>
    <Text style={itemStyles.title}>{data.nombre}</Text>
    <Text style={itemStyles.subtitle}>
      {moneyFormat(data.precioVenta)}
      {data.descripcion ? ` ${data.descripcion}` : ' '}
    </Text>
  </TouchableOpacity>
);
const ClientItem = ({data, index}) => (
  <TouchableOpacity
    key={data + index}
    style={styles.itemList}
    onPress={() => {
      store.dispatch({
        type: 'SET_CART_CLIENT',
        clientData: data,
      });
    }}>
    <Text style={itemStyles.title}>{data.nombre}</Text>
    {data.telefono || data.email ? (
      <Text style={itemStyles.subtitle}>
        {data.telefono ? data.telefono : ''} {data.email ? data.email : ''}
      </Text>
    ) : null}
  </TouchableOpacity>
);

export {ProductItem, ServiceItem, ClientItem};
