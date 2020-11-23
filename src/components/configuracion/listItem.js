/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.ListItem}
      onPress={() => navigation.navigate(item.screen)}>
      <View style={styles.listIcon}>
        <Icon name={item.icon} size={28} color="#101e5a" />
      </View>
      <View style={styles.listInfo}>
        <Text style={{fontSize: 18}}>{item.name}</Text>
        <Text style={{fontSize: 12, color: '#000000aa'}}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
