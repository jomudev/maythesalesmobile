/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import styles from './listStyles';
import {moneyFormat} from '../mainFunctions';

const RenderItemProducto = ({producto}) => {
  return (
    <View style={styles.productContainer}>
      <Text
        style={{
          width: '50%',
        }}>{`${producto.cantidad} ${producto.nombre}`}</Text>
      <Text style={{width: '50%', textAlign: 'right'}}>
        {moneyFormat(producto.precioVenta * producto.cantidad)}
      </Text>
    </View>
  );
};

const RenderItemServicio = ({servicio}) => {
  return (
    <View style={styles.productContainer}>
      <Text
        style={{
          width: '50%',
        }}>{`${servicio.cantidad} ${servicio.nombre}`}</Text>
      <Text style={{width: '50%', textAlign: 'right'}}>
        {moneyFormat(servicio.precioVenta * servicio.cantidad)}
      </Text>
    </View>
  );
};

export {RenderItemProducto, RenderItemServicio};
