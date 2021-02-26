/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import RenderVentasCollection from '../listItem';
import {isToday} from 'date-fns';
import {db, moneyFormat} from '../mainFunctions';
import EmptyListImages from '../emptyListImage';

const Ventas = () => {
  const [salesList, setSalesList] = useState([]);
  const [totalSoldOut, setTotalSoldOut] = useState(0);
  const [totalProfits, setTotalProfits] = useState(0);

  useEffect(() => {
    const filterBySold = (item) => item.estado;

    const calculateTotalSoldOut = (list) => {
      if (list.length === 0) {
        return 0;
      }
      list = list.map((item) => item.total);
      return list.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      });
    };

    const calculateTotalProfits = (list) => {
      if (list.length === 0) {
        return 0;
      }
      const total = calculateTotalSoldOut(list);
      const costs = list
        .map((item) => {
          let saleProfits = 0;
          if (item.servicios.length) {
            saleProfits = item.productos
              .map((producto) => producto.precioCosto * producto.cantidad)
              .reduce((productCost, currentCost) => productCost + currentCost);
          }
          if (item.servicios.length) {
            saleProfits += item.servicios
              .map((services) => services.precioCosto * services.cantidad)
              .reduce(
                (servicesCost, currentCost) => servicesCost + currentCost,
              );
          }
          return saleProfits;
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      return total - costs;
    };

    const unsubscribe = db('ventas').onSnapshot(async (snap) => {
      try {
        const request = await db('ventas').get();
        let newList = request.docChanges().map((change) => change.doc.data());
        newList = newList.filter((sale) => {
          const saleDate = new Date(sale.timestamp.seconds * 1000);
          return isToday(saleDate);
        });
        if (JSON.stringify(salesList) !== JSON.stringify(newList)) {
          setSalesList(newList.reverse());
        }
        setTotalSoldOut(calculateTotalSoldOut(newList.filter(filterBySold)));
        setTotalProfits(calculateTotalProfits(newList.filter(filterBySold)));
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
          backgroundColor: '#e6e8f1',
        }}>
        {EmptyListImages.default()}
        <Text style={{fontSize: 20, color: '#00000055'}}>
          No hay registros de ventas este día...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalSoldOut}>
          Vendido en el día: {moneyFormat(totalSoldOut)}
        </Text>
        <Text style={styles.totalProfits}>
          Ganancias del día: {moneyFormat(totalProfits)}
        </Text>
      </View>
      <ScrollView style={styles.salesContainer}>
        {salesList.map((venta) => (
          <RenderVentasCollection
            sale={venta}
            key={venta.timestamp.nanoseconds * Math.random()}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Ventas;

const styles = StyleSheet.create({
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e6e8f1',
  },
  salesContainer: {
    backgroundColor: '#e6e8f1',
  },
  totalContainer: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    alignContent: 'center',
  },
  totalSoldOut: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#e6e8f1',
    borderRadius: 4,
    margin: 1,
    padding: 16,
    fontSize: 16,
  },
  totalProfits: {
    margin: 1,
    color: 'black',
    padding: 16,
    backgroundColor: '#e6e8f1',
    borderRadius: 4,
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
});
