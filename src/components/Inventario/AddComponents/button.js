/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const Button = ({action, aditionalStyles}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={[styles.btn, aditionalStyles ? aditionalStyles : null]}
        onPress={() => action()}>
        <Text style={{color: 'white'}}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
