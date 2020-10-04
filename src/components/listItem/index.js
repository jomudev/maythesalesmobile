/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {RenderItemProducto, RenderItemServicio} from './Item';
import styles from './listStyles';
import moment from 'moment';

const subtotal = lista => {
  let sum = 0;
  lista.forEach(item => (sum += item.ventaP_U));
  return Number.parseFloat(sum).toFixed(2);
};

const RenderVentasCollection = ({venta}) => {
  console.log(venta);
  return (
    <View style={styles.venta}>
      <View style={styles.ventaHeader}>
        <Text style={styles.ventaTitleText}>
          {moment(venta.fecha).format('DD/MM/YYYY')}{' '}
          {moment(venta.fecha).fromNow()}
        </Text>
        {venta.cliente ? venta.cliente.nombre : null}
      </View>
      {venta.servicios.length > 0 ? (
        <Text style={styles.ventaTitleText}>Productos</Text>
      ) : null}
      {venta.lista.map(producto => {
        return <RenderItemProducto key={producto.id} producto={producto} />;
      })}
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalTitle}>subtotal productos:</Text>
        <Text style={styles.subtotal}>L{subtotal(venta.lista)}</Text>
      </View>
      {venta.servicios.length > 0 ? (
        <Text style={styles.ventaTitleText}>Servicios adicionales</Text>
      ) : null}
      {venta.servicios.map(servicio => (
        <RenderItemServicio key={servicio.id} servicio={servicio} />
      ))}
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalTitle}>
          subtotal servicios adicionales:
        </Text>
        <Text style={styles.subtotal}>L{subtotal(venta.servicios)}</Text>
      </View>
      <View>
        <Text style={{textAlign: 'right', fontWeight: 'bold'}}>
          Total: L{Number.parseFloat(venta.total).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default RenderVentasCollection;
