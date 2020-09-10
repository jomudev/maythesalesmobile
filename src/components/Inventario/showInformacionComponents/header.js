/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const Header = ({setModalValue, title}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          setModalValue({visible: false});
        }}
        style={styles.headerLeftComponent}>
        <Icon name="navigate-before" size={36} style={{color: '#101e5a'}} />
      </TouchableOpacity>
      <Text style={styles.headerCenterComponent}>{title}</Text>
    </View>
  );
};

export default Header;
