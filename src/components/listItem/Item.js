/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import styles from './listStyles';
import {moneyFormat} from '../mainFunctions';

const RenderItemProducto = ({producto, isWholesaler}) => {
  return (
    <View style={styles.productContainer}>
      <Text
        style={{
          width: '50%',
        }}>{`${producto.cantidad} ${producto.nombre}`}</Text>
      <Text style={{width: '50%', textAlign: 'right'}}>
        {moneyFormat(
          (isWholesaler ? producto.precioMayoreo : producto.precioVenta) *
            producto.cantidad,
        )}
      </Text>
    </View>
  );
};

const RenderItemServicio = ({servicio, isWholesaler}) => {
  return (
    <View style={styles.productContainer}>
      <Text
        style={{
          width: '50%',
        }}>{`${servicio.cantidad} ${servicio.nombre}`}</Text>
      <Text style={{width: '50%', textAlign: 'right'}}>
        {moneyFormat(
          (isWholesaler
            ? servicio.precioMayoreo
              ? servicio.precioMayoreo
              : servicio.precioVenta
            : servicio.precioVenta) * servicio.cantidad,
        )}
      </Text>
    </View>
  );
};

export {RenderItemProducto, RenderItemServicio};
