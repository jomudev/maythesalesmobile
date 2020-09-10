/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import RenderItemVenta from './Item';
import styles from './listStyles';
import moment from 'moment';

const RenderItem = ({item}) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitleText}>
          {moment(item.fecha).calendar()}
        </Text>
        {item.cliente.nombre ? <Text>{item.cliente.nombre}</Text> : null}
      </View>
      {item.lista.map((data, i) => (
        <RenderItemVenta key={data + i} item={data} />
      ))}
      <View>
        <Text style={{textAlign: 'right'}}>
          <Text style={{fontWeight: 'bold'}}>Total: </Text>L
          {Number.parseFloat(item.total).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default RenderItem;
