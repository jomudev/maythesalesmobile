/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {RenderImage} from '../../auxComponents';
import QuantityEditor from './quantityEditor';
import {moneyFormat} from '../../mainFunctions';
import styles from './styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { removeProductFromCart } from './functions';


const ProductsList = ({products, wholesaler}) => {
  return (
    <FlatList 
      data={products}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ListItem data={item} wholesaler={wholesaler} />}
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

const ListItem = ({data, wholesaler}) => <Swipeable
  renderLeftActions={LeftSwipeAction} 
  renderRightActions={RightSwipeAction} 
  onSwipeableLeftOpen={() => {removeProductFromCart(data.id)}}
  onSwipeableRightOpen={() => {removeProductFromCart(data.id)}}  
  >
    <Product data={data} wholesaler={wholesaler} />
  </Swipeable>


function Product ({data, wholesaler}) {
  const {
    imageURL,
    nombre,
    marca,
    descripcion,
    precioVenta,
    precioMayoreo,
    cantidad,
    id,
  } = data;

  return (
      <View style={styles.productContainer}>
        <RenderImage
          source={{uri: imageURL}}
          priority="high"
          style={styles.productImage}
        />
        <View style={styles.productDescriptionContainer}>
          <Text style={styles.productName} ellipsizeMode="tail" numberOfLines={2}>{nombre}</Text>
          {
            descripcion ? <Text style={styles.productDescription}>{descripcion}</Text> : null
          }
          {
            marca ? <Text style={styles.productBrand}>{marca}</Text> : null
          }
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>
              {wholesaler ? moneyFormat(precioMayoreo) : moneyFormat(precioVenta)}
            </Text>
            <QuantityEditor defaultQuantity={cantidad} type="PRODUCT" id={id} />
          </View>
        </View>
    </View>
  );
};

export default ProductsList;