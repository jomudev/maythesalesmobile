/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
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
    <Image
      style={styles.itemImage}
      source={
        data.imageURL
          ? {uri: data.imageURL}
          : require('../../assets/AdditionalMedia/productDefaultImage.png')
      }
    />
    <View>
      <Text style={itemStyles.title}>
        {`${data.nombre} ${moneyFormat(data.precioVenta)}`}
      </Text>
      <Text style={itemStyles.subtitle} ellipsizeMode="tail">
        {data.marca}
      </Text>
    </View>
  </TouchableOpacity>
);

const ServiceItem = ({data}) => (
  <TouchableOpacity
    style={{...styles.itemList, flexDirection: 'column'}}
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
    style={{...styles.itemList, flexDirection: 'column'}}
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

const WholesalerItem = ({data}) => (
  <TouchableOpacity
    style={{...styles.itemList, flexDirection: 'column'}}
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
