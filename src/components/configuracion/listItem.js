/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const ListItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.ListItem}
      onPress={() => navigation.navigate(item.screen)}>
      <Text style={{fontSize: 18}}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default ListItem;
