/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import { moneyFormat, phoneFormat } from '../mainFunctions';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import defaultImage from '../../assets/AdditionalMedia/productDefaultImage.png';
const defaultImageURI = Image.resolveAssetSource(defaultImage).uri;

const Dot = () => (
  <>
    <Text> </Text>
    <Icon
      name="fiber-manual-record"
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
  return (
    <FastImage
      source={{
        uri: imageURL ? imageURL : defaultImageURI,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
      }}
      style={styles.listItemImage}
    />
  );
};

function getSubtitlesList(data, type) {
  if (data) {
    if (type === 'clientes' || type === 'proveedores' || type === 'mayoristas') {
      return [data.email, phoneFormat(data.telefono)];
    }
    if (type === 'productos') {
      return [moneyFormat(data.precioVenta), data.marca, data.categoria];
    }
    if (type === 'servicios') {
      return [moneyFormat(data.precioVenta), data.marca];
    }
  } 
  return [];
}

const ListItem = ({navigation, type, data}) => {
  let subtitle = getSubtitlesList(data, type)
  subtitle = subtitle.filter(item => item !== null && item !== undefined && item !== '');
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('ShowItem', {
          type,
          data,
        })
      }>
      {type === 'productos' || type === 'servicios' ? <ItemImage imageURL={data.imageURL} /> : null}
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
      <View style={styles.modifyQuantityContainer}>
          <TouchableOpacity style={styles.modifyQuantityButton}>
            <Icon name="add" size={20} color="#999" />
          </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
