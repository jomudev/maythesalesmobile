/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import store from '../../../store';
import RenderItem from '../listItem';
import moment from 'moment';

const subscriberFunction = () => {
  let fechaActual = moment().format('DDMMYYYY');
  let nuevaLista = [];
  store.getState().ventas.forEach(v => {
    const fechaVenta = moment(v.fecha).format('DDMMYYYY');
    fechaVenta === fechaActual ? (nuevaLista = nuevaLista.concat(v)) : null;
  });
  return nuevaLista;
};

const Ventas = () => {
  const [listaVentas, setListaVentas] = useState([]);

  useEffect(() => {
    setListaVentas(subscriberFunction);
    const unsubscriber = store.subscribe(() => {
      setListaVentas(subscriberFunction);
    });

    return unsubscriber;
  }, []);

  if (listaVentas.length === 0) {
    return (
      <View style={{alignContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 16, color: '#777'}}>
          Aquí se muestran las ventas del día
        </Text>
      </View>
    );
  }
  return (
    <ScrollView>
      {listaVentas.map(item => (
        <RenderItem item={item} key={Math.random()} />
      ))}
    </ScrollView>
  );
};

export default Ventas;
