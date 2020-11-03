import React from 'react';
import {ScrollView} from 'react-native';
import RenderVentasCollection from '../listItem';
import styles from '../listItem/listStyles';

const ReporteMes = ({route}) => {
  const ventas = route.params.params.ventas.reverse();
  return (
    <ScrollView style={styles.listVentas}>
      {ventas.map(item => (
        <RenderVentasCollection venta={item} key={Math.random()} />
      ))}
    </ScrollView>
  );
};

export default ReporteMes;
