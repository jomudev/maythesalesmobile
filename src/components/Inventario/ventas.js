/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RenderVentasCollection from '../listItem';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

async function getData() {
  try {
    return await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('ventas')
      .get();
  } catch (err) {
    console.log(err);
  }
}

const Ventas = () => {
  const [listaVentas, setListaVentas] = useState([]);

  useEffect(() => {
    const unsubscriber = getData().then(res => {
      let newList = [];
      res.docs.forEach(doc => {
        if (
          moment(doc.data().fecha).format('DD/MM/YYYY') ===
          moment().format('DD/MM/YYYY')
        ) {
          newList.push(doc.data());
        }
      });
      setListaVentas(newList.reverse());
    });
    return () => {
      unsubscriber;
    };
  }, []);

  if (listaVentas.length === 0) {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, color: '#00000055'}}>
          Aquí se muestran las ventas del día
        </Text>
      </View>
    );
  }
  return (
    <ScrollView>
      {listaVentas.map(venta => (
        <RenderVentasCollection venta={venta} key={venta.fecha} />
      ))}
    </ScrollView>
  );
};

export default Ventas;
