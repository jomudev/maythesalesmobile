/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {moneyFormat} from '../mainFunctions';
import QuantityEditor from './quantityEditor';
import styles from './styles';
import DeleteButton from './deleteButton';
import {removeServiceFromCart} from './functions';

const ServicesList = ({services, wholesaler}) => {
  return (
    <View>
      {services.length > 0 ? (
        <Text style={styles.cartTitle}>Servicios adicionales</Text>
      ) : null}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cartList}>
        {services.map((service) => (
          <Service key={service.id} data={service} wholesaler={wholesaler} />
        ))}
      </ScrollView>
    </View>
  );
};

const Service = ({data, wholesaler}) => {
  const {nombre, precioVenta, precioMayoreo, marca, cantidad, id} = data;
  return (
    <View style={styles.productContainer}>
      <DeleteButton onPress={() => removeServiceFromCart(data.id)} />
      <Text style={styles.productName}>{nombre}</Text>
      <Text style={styles.productDescription}>{marca}</Text>
      <Text
        style={{
          fontSize: 32,
          fontFamily: 'VarelaRound-Regular',
        }}>
        {wholesaler ? moneyFormat(precioMayoreo) : moneyFormat(precioVenta)}
      </Text>
      <View>
        <QuantityEditor defaultQuantity={cantidad} id={id} type="SERVICE" />
      </View>
    </View>
  );
};

export default ServicesList;
