/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import RenderVentasCollection from '../listItem';
import {isToday} from 'date-fns';
import {db, moneyFormat} from '../mainFunctions';

const Ventas = () => {
  const [salesList, setSalesList] = useState([]);
  const [totalSoldOut, setTotalSoldOut] = useState(0);
  const [totalProfits, setTotalProfits] = useState(0);

  const calculateTotalSoldOut = (list) => {
    console.log('update soldOut');
    let total = 0;
    list.forEach((item) => {
      total += item.estado ? item.total : 0;
    });
    return total;
  };

  const calculateTotalProfits = (list) => {
    let total = 0;
    let costPrice = 0;
    list.forEach((item) => {
      if (item.estado) {
        total += item.total;
        item.productos.forEach((product) => {
          costPrice += product.precioCosto * product.cantidad;
        });
        item.servicios.forEach((servicio) => {
          costPrice += servicio.precioCosto * servicio.cantidad;
        });
      }
    });
    return total - costPrice;
  };

  useEffect(() => {
    const unsubscribe = db('ventas').onSnapshot((snap) => {
      try {
        let newList = salesList;
        const changes = snap.docChanges();
        let isModifying = false;
        for (let i = 0; i < changes.length; i++) {
          const change = changes[i];
          if (isToday(new Date(change.doc.data().timestamp.seconds * 1000))) {
            const docData = change.doc.data();
            switch (change.type) {
              case 'added':
                const isInList = salesList.filter(
                  (item) => item.id === docData.id,
                ).length;
                if (isInList === 0) {
                  newList = newList.concat(docData);
                }
                break;
              case 'modified':
                isModifying = true;
                newList = salesList.map((item) =>
                  item.timestamp.seconds === docData.timestamp.seconds
                    ? docData
                    : item,
                );
                break;
              case 'removed':
                newList = newList.filter((item) => item.id !== docData.id);
                break;
              default:
                break;
            }
          }
        }

        if (JSON.stringify(salesList) !== JSON.stringify(newList)) {
          setSalesList(isModifying ? newList : newList.reverse());
        }
        setTotalSoldOut(calculateTotalSoldOut(salesList));
        setTotalProfits(calculateTotalProfits(salesList));
      } catch (err) {
        console.log(err);
      }
    });
    return unsubscribe;
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
    <>
      <View style={styles.totalContainer}>
        <Text style={styles.totalSoldOut}>
          Vendido en el día: {moneyFormat(totalSoldOut)}
        </Text>
        <Text style={styles.totalProfits}>
          ganancias del día: {moneyFormat(totalProfits)}
        </Text>
      </View>
      <ScrollView>
        {salesList.map((venta) => (
          <RenderVentasCollection
            venta={venta}
            key={venta.timestamp.nanoseconds * Math.random()}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default Ventas;

const styles = StyleSheet.create({
  totalContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  totalSoldOut: {
    flex: 1,
    textAlign: 'left',
    color: '#101e5a',
    fontSize: 16,
  },
  totalProfits: {
    color: '#101e5a',
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
  },
});
