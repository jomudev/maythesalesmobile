import React, {useState} from 'react';
import {Pressable, TextInput, View, Text} from 'react-native';
import styles from './styles';
import {updateQuantity} from './functions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QuantityEditor = ({defaultQuantity, type, id}) => {
  const [quantity, setQuantity] = useState(defaultQuantity);

  const changeQuantity = (newQuantity) => {
    const numberIsValid = newQuantity > 0;
    if (numberIsValid) {
      setQuantity(newQuantity);
      updateQuantity(type, newQuantity, id);
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
