/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const ListItem = ({data, title, subtitle, setItemData}) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={() => setItemData(data)}>
      <Text style={{fontSize: 18}}>{title}</Text>
      <Text>
        {subtitle.map((item, index) => (
          <Text key={item + index}>{item}</Text>
        ))}
      </Text>
    </TouchableOpacity>
  );
};

export default ListItem;
