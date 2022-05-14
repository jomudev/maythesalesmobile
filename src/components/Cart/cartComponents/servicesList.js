/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {moneyFormat} from '../../mainFunctions';
import styles from './styles';

const ServicesList = ({services, wholesaler}) => {
  return (
    <View style={styles.cartList}>
      {services.length > 0 ? (
        <Text style={styles.cartTitle}>Servicios adicionales</Text>
      ) : null}
        {services.map((service) => (
          <Service key={service.id} data={service} wholesaler={wholesaler} />
        ))}
    </View>
  );
};

const Service = ({data, wholesaler}) => {
  const {nombre, precioVenta, precioMayoreo, marca, cantidad, id} = data;
  return (
    <View style={styles.serviceContainer}>
      <Text style={styles.productName} ellipsizeMode="tail" numberOfLines={1} >{nombre}</Text>
      <Text style={styles.productDescription}>{marca}</Text>
      <Text>
        {wholesaler ? moneyFormat(precioMayoreo) : moneyFormat(precioVenta)}
      </Text>
    </View>
  );
};

export default ServicesList;
