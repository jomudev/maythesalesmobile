/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet, RefreshControl} from 'react-native';
import RenderVentasCollection from '../listItem';
import {isToday} from 'date-fns';
import {db, moneyFormat} from '../mainFunctions';
import EmptyListImages from '../emptyListImage';
import {ReportsBannerAd} from '../ads';

const Ventas = () => {
  const [salesList, setSalesList] = useState([]);
  const [totalSoldOut, setTotalSoldOut] = useState(0);
  const [totalProfits, setTotalProfits] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
        if (item.productos.length) {
          saleProfits = item.productos
            .map((producto) => producto.precioCosto * producto.cantidad)
            .reduce((productCost, currentCost) => productCost + currentCost);
        }
        if (item.servicios.length) {
          saleProfits += item.servicios
            .map((service) => service.precioCosto * service.cantidad)
            .reduce((serviceCost, currentCost) => serviceCost + currentCost);
        }
        return saleProfits;
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    return total - costs;
  };

  useEffect(() => {
    const filterBySold = (item) => item.estado;

    const unsubscribe = db('ventas').onSnapshot(async (snap) => {
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
    });

    return () => {
      unsubscribe();
    };
  }, [refreshing]);

  if (salesList.length === 0) {
    return EmptyListImages.ImageComponent('Realice una venta en la sección de "Nueva venta" para verlas reflejadas aquí');
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
      <ReportsBannerAd />
      <ScrollView 
        refreshControl={
          <RefreshControl 
          onRefresh={onRefresh} 
          refreshing={refreshing} 
          />}
          style={styles.salesContainer}>
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
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 1,
    padding: 16,
    fontSize: 16,
  },
  totalProfits: {
    margin: 1,
    color: 'black',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 4,
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  emptyListContainer: {
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 20,
    color: 'gray',
    position: 'absolute',
  },
});
