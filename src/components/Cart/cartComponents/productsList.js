/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import QuantityEditor from './quantityEditor';
import styles from './styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import store from '../../../../store';

const ProductsList = ({products}) => {

  return (
    <FlatList 
      data={products}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ListItem data={item} key={item.id} />}
      style={styles.cartList}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const LeftSwipeAction = () => (
  <View style={styles.swipeItem}>
    <Text style={styles.swipeItemText}>Eliminar</Text>
  </View>
)

const RightSwipeAction = () => (
  <View style={[styles.swipeItem, {alignItems: 'flex-end'}]}>
    <Text style={{color: 'white'}}>Eliminar</Text>
  </View>
)

const ListItem = ({data}) => {
  const cart = store.getState().cart;
  return <Swipeable
    renderLeftActions={LeftSwipeAction} 
    renderRightActions={RightSwipeAction} 
    onSwipeableLeftOpen={() => {cart.removeTo('productos', data.id)}}
    onSwipeableRightOpen={() => {cart.removeTo('servicios', data.id)}}  
    >
      <Product data={data} />
    </Swipeable>
}


const Product = ({data}) => {
  return (
      <View style={styles.productContainer}>
        <Image
          source={{uri: data.imageURL}}
          style={styles.productImage}
        />
        <View style={styles.productDescriptionContainer}>
          <Text style={styles.productName} ellipsizeMode="tail" numberOfLines={2}>{data.nombre}</Text>
          {
            data.descripcion ? <Text style={styles.productDescription}>{data.descripcion}</Text> : null
          }
          {
            data.marca ? <Text style={styles.productBrand}>{data.marca}</Text> : null
          }
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>
              {data.getPrecioVenta()}
            </Text>
            <QuantityEditor defaultQuantity={data.cantidad} type="PRODUCT" id={data.id} />
          </View>
        </View>
    </View>
  );
};

export default ProductsList;