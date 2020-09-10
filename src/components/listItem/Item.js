/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import styles from './listStyles';

const RenderItemVenta = ({item}) => {
  return (
    <View style={styles.productContainer}>
      <Text style={{width: '50%'}}>{`${item.cantidad} ${item.nombre}`}</Text>
      <Text style={{width: '50%', textAlign: 'right'}}>
        L{Number.parseFloat(item.ventaP_U * item.cantidad).toFixed(2)}
      </Text>
    </View>
  );
};

export default RenderItemVenta;
