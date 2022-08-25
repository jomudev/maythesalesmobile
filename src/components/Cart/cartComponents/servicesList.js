/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const ServicesList = ({services}) => {
  return (
    <View style={styles.cartList}>
      {services.length > 0 ? (
        <Text style={styles.cartTitle}>Servicios adicionales</Text>
      ) : null}
        {services.map((service) => (
          <Service key={service.id} data={service} />
        ))}
    </View>
  );
};

const Service = ({data}) => {
  return (
    <View style={styles.serviceContainer}>
      <Text style={styles.productName} ellipsizeMode="tail" numberOfLines={1} >{data.nombre}</Text>
      <Text style={styles.productDescription}>{data.marca}</Text>
      <Text>
        {data.getPrecioVenta()}
      </Text>
    </View>
  );
};

export default ServicesList;
