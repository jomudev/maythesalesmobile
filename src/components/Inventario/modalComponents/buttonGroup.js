/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './modalStyles';

const BtnGroup = ({setModalValue, action}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{float: 'left', width: 'auto'}}>
        <TouchableOpacity
          style={[styles.btn, styles.cancelBtn]}
          onPress={() => setModalValue({visible: false})}>
          <Text style={{color: 'white'}}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      <View style={{float: 'right', width: 'auto'}}>
        <TouchableOpacity
          style={[styles.btn, styles.succesBtn]}
          onPress={() => action()}>
          <Text style={{color: 'white'}}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BtnGroup;
