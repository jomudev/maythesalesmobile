/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dot = () => (
  <>
    <Text> </Text>
    <Icon
      name="fiber-manual-record"
      size={6}
      color="#999"
      style={{
        textAlign: 'center',
      }}
    />
    <Text> </Text>
  </>
);

const ListItem = ({navigation, route, data, title, subtitle}) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('ShowItem', {
          type: route.params.type,
          data,
        })
      }>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemSubtitle}>
        {subtitle.map((item, index) => {
          return (
            <Text key={item}>
              {index > 0 ? <Dot /> : null}
              <Text>{item}</Text>
            </Text>
          );
        })}
      </Text>
    </TouchableOpacity>
  );
};

export default ListItem;
