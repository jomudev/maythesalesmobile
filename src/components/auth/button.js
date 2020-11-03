/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './authStyles';

const Button = ({onPress, text}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress()}>
      <Text style={{color: '#f7f8f9', textAlign: 'center'}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
