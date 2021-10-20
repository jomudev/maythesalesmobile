import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import FormOptions from './data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import productOptionsImage from '../../assets/AdditionalMedia/products-option-image.jpg';
// Foto de Mehrad Vosoughi en Pexels
import clientsOptionsImage from '../../assets/AdditionalMedia/clients-option-image.jpg';
// Foto de Jack Sparrow en Pexels
import servicesOptionsImage from '../../assets/AdditionalMedia/services-option-image.jpg';
// Foto de Ainis Jankauskas en Pexels
import providersOptionsImage from '../../assets/AdditionalMedia/providers-option-image.jpg';
// Foto de Oleg Magni en Pexels
import wholesalersOptionsImage from '../../assets/AdditionalMedia/wholesalers-option-image.jpg';
// Foto de Tiger Lily en Pexels

const ItemList = ({navigation, item}) => {
  let optionImageURI = Image.resolveAssetSource(productOptionsImage).uri;
  if (item.type === 'Clientes') {
    optionImageURI = Image.resolveAssetSource(clientsOptionsImage).uri;
  } else if (item.type === 'Servicios') {
    optionImageURI = Image.resolveAssetSource(servicesOptionsImage).uri;
  } else if (item.type === 'Proveedores') {
    optionImageURI = Image.resolveAssetSource(providersOptionsImage).uri;
  } else if (item.type === 'Mayoristas') {
    optionImageURI = Image.resolveAssetSource(wholesalersOptionsImage).uri;
  }

  return (
    <TouchableOpacity
      style={styles.menuOptionItem}
      onPress={() =>
        navigation.navigate(`ShowInventory`, {collectionKey: item.type.toLowerCase()})
      }>
      <FastImage
        source={{
          uri: optionImageURI,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.optionBackground}
      />
      <View style={styles.menuTitle}>
        <Icon name={item.icon} style={styles.menuOptionIcon} />
        <Text style={styles.menuOptionTitle}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Inventory = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inventoryOptionsContainer}>
        {FormOptions.map((item) => (
          <ItemList navigation={navigation} item={item} key={item.name} />
        ))}
      </View>
    </View>
  );
};

export default Inventory;
