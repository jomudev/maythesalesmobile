import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, View, Text, RefreshControl} from 'react-native';
import RenderVentasCollection from '../listItem';
import {db, moneyFormat, getSaleDate} from '../mainFunctions';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import styles from '../listItem/listStyles';
import LoadingScreen from '../loadingScreen';
import {ReportsBannerAd} from '../ads';

const initialCollectionValue = {
  collection: [],
  totalSoldOut: 0,
  totalProfits: 0,
}

const MonthReports = ({route}) => {
  const [collection, setCollection] = useState(initialCollectionValue);
  const month = route.params.month;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
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

  const calculateTotalSoldOut = (list) => {
    if (list.length === 0) {
      return 0;
    }
    list = list.map((item) => item.total);
    return list.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    });
  };
  
  const getCollection = async () => {
    const filterBySold = (item) => item.estado;
    let collection = (await db('ventas').get())
    .docChanges().map((change) => change.doc.data());

    collection = collection.filter((doc) => {
        return getSaleDate(doc, 'MMMM') === month;
      });

      return {
        collection,
        totalSoldOut: calculateTotalSoldOut(collection.filter(filterBySold)),
        totalProfits: calculateTotalProfits(collection.filter(filterBySold)),
      }
  }

  const onRefresh = useCallback(() => {
    getCollection().then((response) => {
      setCollection(response);
    })
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    const subscriber = db('ventas').onSnapshot(() => {
      getCollection().then((response) => {
        setCollection(response);
        setLoading(false);
      })
    });

    return subscriber;
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <ScrollView
      style={styles.listVentas}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.totalContainer}>
        <Text style={styles.totalSoldOut}>
          Vendido en el mes: {moneyFormat(collection.totalSoldOut)}
        </Text>
        <Text style={styles.totalProfits}>
          Ganancias del mes: {moneyFormat(collection.totalProfits)}
        </Text>
      </View>
      <ReportsBannerAd />
      {collection.collection
        .map((item) => (
          <RenderVentasCollection sale={item} key={Math.random()} />
        ))
        .reverse()}
    </ScrollView>
  );
};

export default MonthReports;
