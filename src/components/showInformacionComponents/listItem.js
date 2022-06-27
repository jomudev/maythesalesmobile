/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, View, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import {phoneFormat } from '../mainFunctions';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrencyFunctions from '../../utils/currencyFunctions';
import AddMoreQuantity from '../../utils/components/products/AddMoreQuantity';

const Dot = () => (
  <>
    <Text> </Text>
    <Icon
      name="record"
      size={8}
      color="#999"
      style={{
        textAlign: 'center',
      }}
    />
    <Text> </Text>
  </>
);

const ItemImage = ({imageURL}) => {
  return imageURL ? (
    <FastImage
      source={{
        uri: imageURL,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
      }}
      style={styles.listItemImage}
    />
  ) : 
  (
    <View style={styles.listItemImage}>
      <Icon name="image-outline" size={40} color="#999" />
    </View>
  );
};

function getSubtitlesList(data, type) {
  if (data) {
    if (type === 'clientes' || type === 'proveedores' || type === 'mayoristas') {
      return [data.email, phoneFormat(data.telefono)];
    }
    if (type === 'productos') {
      return [CurrencyFunctions.moneyFormat(data.precioVenta), data.marca, data.categoria];
    }
    if (type === 'servicios') {
      return [CurrencyFunctions.moneyFormat(data.precioVenta), data.marca];
    }
  } 
  return [];
}

const ListItem = ({navigation, type, data}) => {
  const [showAddQuantityComponent, setShowAddQuantityComponent] = React.useState(false);
  let subtitle = getSubtitlesList(data, type)
  subtitle = subtitle.filter(item => item !== null && item !== undefined && item !== '');
  return (
    <>
      <AddMoreQuantity show={showAddQuantityComponent} data={data} close={() => setShowAddQuantityComponent(false)} />
      <TouchableOpacity
        style={styles.listItem}
        onPress={() =>
          navigation.navigate('ShowItem', {
            type,
            data,
          })
        }>
        <View style={styles.flex1Center}>
          {type === 'productos' || type === 'servicios' ? <ItemImage imageURL={data.imageURL} /> : null}
        </View>
        <View style={[styles.flex2Center, {flexDirection: 'row'}]}>
          <View style={styles.quantityContainer}>
            {data.cantidad ? (
              <View style={styles.listItemQuantity}>
                <Text
                  adjustsFontSizeToFit
                  style={{color: 'black', fontWeight: 'bold'}}>
                  {data.cantidad}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.listItemText}>
            <Text style={styles.itemTitle}>{data.nombre}</Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.itemSubtitle}>
              {subtitle.map((item, index) => {
                return (
                  <Text key={Math.random()}>
                    {index > 0 ? <Dot /> : null}
                    <Text>{item}</Text>
                  </Text>
                );
              })}
            </Text>
          </View>
        </View>
        <View style={styles.flex1Center}>
          <View style={styles.modifyQuantityContainer}>
              <TouchableOpacity style={styles.modifyQuantityButton} onPress={() => setShowAddQuantityComponent(true)}>
                <Icon name="plus-circle-outline" size={36} color="#999" />
              </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ListItem;
