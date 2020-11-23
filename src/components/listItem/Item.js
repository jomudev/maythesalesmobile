/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import styles from './listStyles';

const RenderItemProducto = ({producto}) => {
  return (
    <View style={styles.productContainer}>
      <Text
        style={{
          width: '50%',
        }}>{`${producto.cantidad} ${producto.nombre}`}</Text>
      <Text style={{width: '50%', textAlign: 'right'}}>
        L
        {Number.parseFloat(producto.precioVenta * producto.cantidad).toFixed(2)}
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
        L
        {Number.parseFloat(servicio.precioVenta * servicio.cantidad).toFixed(2)}
      </Text>
    </View>
  );
};

export {RenderItemProducto, RenderItemServicio};
