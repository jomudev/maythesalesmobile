/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RenderVentasCollection from '../listItem';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

const isActual = (fecha) => {
  return (
    moment(fecha, 'x').format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')
  );
};

const Ventas = () => {
  const [listaVentas, setListaVentas] = useState([]);

  useEffect(() => {
    const unsubscriber = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('ventas')
      .onSnapshot((snap) => {
        try {
          let newList = listaVentas;
          snap.docChanges().forEach((change) => {
            let docData = change.doc.data();
            if (isActual(docData.timestamp)) {
              switch (change.type) {
                case 'added':
                  const isInList =
                    newList.filter(
                      (item) => item.timestamp === docData.timestamp,
                    ).length > 0;
                  if (!isInList) {
                    newList = newList.concat(docData);
                  }
                  break;
                case 'removed':
                  newList = newList.filter((item) => item.id !== docData.id);
                  break;
                default:
                  break;
              }
            }
          });
          if (JSON.stringify(listaVentas) !== JSON.stringify(newList)) {
            setListaVentas(newList.reverse());
          }
        } catch (err) {
          console.log(err);
        }
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
          No hay registros de ventas este día...
        </Text>
      </View>
    );
  }
  return (
    <ScrollView>
      {listaVentas.map((venta) => (
        <RenderVentasCollection venta={venta} key={venta.timestamp} />
      ))}
    </ScrollView>
  );
};

export default Ventas;
