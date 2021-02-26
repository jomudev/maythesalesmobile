/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import defaultImage from '../../assets/AdditionalMedia/productDefaultImage.png';
const defaultImageURI = Image.resolveAssetSource(defaultImage).uri;

const Dot = () => (
  <>
    <Text> </Text>
    <Icon
      name="fiber-manual-record"
      size={6}
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

const ListItem = ({navigation, type, route, data, title, subtitle}) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('ShowItem', {
          type: route.params.type,
          data,
        })
      }>
      {data.cantidad ? (
        <View style={styles.listItemQuantity}>
          <Text
            adjustsFontSizeToFit
            style={{color: 'black', fontWeight: 'bold'}}>
            {data.cantidad}
          </Text>
        </View>
      ) : null}
      {type === 'productos' ? <ItemImage imageURL={data.imageURL} /> : null}
      <View style={styles.listItemText}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.itemSubtitle}>
          {subtitle.map((item, index) => {
            return (
              <Text key={item}>
                {index > 0 ? <Dot /> : null}
                <Text>{item}</Text>
              </Text>
            );
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
