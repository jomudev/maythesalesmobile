/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './modalStyles';

const BtnGroup = ({action}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={styles.btn} onPress={() => action()}>
        <Text style={{color: 'white'}}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BtnGroup;
