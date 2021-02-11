/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import RenderVentasCollection from '../listItem';
import {isToday} from 'date-fns';
import {db} from '../mainFunctions';

const Ventas = () => {
  const [salesList, setSalesList] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = db('ventas').onSnapshot((snap) => {
        try {
          let newList = salesList;
          snap.docChanges().forEach((change) => {

            if (isToday(new Date(change.doc.data().timestamp.seconds * 1000))) {

              let docData = change.doc.data();
              switch (change.type) {
                case 'added':
                  const isInList = salesList.filter(
                    (item) => JSON.stringify(item) === JSON.stringify(docData),
                  ).length;
                  if (isInList === 0) {
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
          if (JSON.stringify(salesList) !== JSON.stringify(newList)) {
            setSalesList(newList.reverse());
          }
        } catch (err) {
          console.log(err);
        }
      });
      return unsubscribe;
    } catch (err) {
      console.warn('error al intentar obtener las ventas', err);
    }
  }, [salesList]);

  if (salesList.length === 0) {
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
      {salesList.map((venta) => (
        <RenderVentasCollection
          venta={venta}
          key={venta.timestamp.nanoseconds * Math.random()}
        />
      ))}
    </ScrollView>
  );
};

export default Ventas;
