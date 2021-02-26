/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ListItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.ListItem}
      onPress={() => navigation.navigate(item.screen)}>
      <View style={styles.listIcon}>
        <Icon name={item.icon} size={24} color="#101e5a" />
      </View>
      <View style={styles.listInfo}>
        <Text style={{fontSize: 16}}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
