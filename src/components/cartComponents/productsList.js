/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {RenderImage} from '../auxComponents';
import QuantityEditor from './quantityEditor';
import {moneyFormat} from '../mainFunctions';
import styles from './styles';
import {removeProductFromCart} from './functions';
import DeleteButton from './deleteButton';

const ProductsList = ({products, wholesaler}) => {
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cartList}>
        {products.map((product) => (
          <Product key={product.id + product.nombre} data={product} wholesaler={wholesaler} />
        ))}
      </ScrollView>
    </View>
  );
};

const Product = ({data, wholesaler}) => {
  const {
    imageURL,
    nombre,
    precioVenta,
    precioMayoreo,
    marca,
    cantidad,
    id,
  } = data;
  return (
    <View style={styles.productContainer}>
      <DeleteButton onPress={() => removeProductFromCart(data.id)} />
      <RenderImage
        source={{uri: imageURL}}
        priority="high"
        style={styles.productImage}
      />
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
        <QuantityEditor defaultQuantity={cantidad} type="PRODUCT" id={id} />
      </View>
    </View>
  );
};

export default ProductsList;
