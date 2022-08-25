import React, {useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QuantityEditor = ({defaultQuantity, type, id, cartRef}) => {
  const [quantity, setQuantity] = useState(defaultQuantity);

  const changeQuantity = (newQuantity) => {
    const numberIsValid = newQuantity > 0;
    if (numberIsValid) {
      console.log('number is valid', newQuantity);
    }
  };

  return (
    <View style={styles.quantityContainer}>
      <Pressable
        style={styles.quantityButton}
        onPress={() => {
          changeQuantity(quantity - 1);
        }}>
        <Icon name="minus" size={20} color="gray" />
      </Pressable>
      <TextInput
        value={quantity.toString()}
        onChangeText={(text) => setQuantity(Number(text))}
        onSubmitEditing={() => changeQuantity(quantity)}
        onBlurEditing={() => changeQuantity(quantity)}
        style={styles.quantityInput}
        underlineColorAndroid="#fff"
      />
      <Pressable
        style={styles.quantityButton}
        onPress={() => {
          changeQuantity(quantity + 1);
        }}>
        <Icon name="plus" size={20} color="gray" />
      </Pressable>
    </View>
  );
};

export default QuantityEditor;
