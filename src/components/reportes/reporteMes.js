import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import RenderVentasCollection from '../listItem';
import {db, moneyFormat} from '../mainFunctions';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import styles from '../listItem/listStyles';
import LoadingScreen from '../loadingScreen';
import {BannerAdvert} from '../ads';

const ReporteMes = ({route}) => {
  const [sales, setSales] = useState([]);
  const month = route.params.params.month;
  const [totalSoldOut, setTotalSoldOut] = useState(0);
  const [totalProfits, setTotalProfits] = useState(0);
  const [loading, setLoading] = useState(true);

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

    const subscriber = db('ventas').onSnapshot(async (snapshot) => {
      if (!snapshot) {
        return;
      }
      const request = await db('ventas').get();
      let collection = request.docChanges().map((change) => change.doc.data());
      collection = collection.filter((doc) => {
        const docDate = new Date(doc.timestamp.seconds * 1000);
        return format(docDate, 'MMMM', {locale: es}) === month;
      })
      if (JSON.stringify(collection) !== JSON.stringify(sales)) {
        setSales(collection);
        setTotalSoldOut(calculateTotalSoldOut(collection.filter(filterBySold)));
        setTotalProfits(calculateTotalProfits(collection.filter(filterBySold)));
      }
      setLoading(false);
    });

    return subscriber;
  }, [month, sales]);
  if (loading) {
    return <LoadingScreen />
  }
  return (
    <ScrollView style={styles.listVentas}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalSoldOut}>
          Vendido en el mes: {moneyFormat(totalSoldOut)}
        </Text>
        <Text style={styles.totalProfits}>
          Ganancias del mes: {moneyFormat(totalProfits)}
        </Text>
      </View>
      <BannerAdvert />
      {sales
        .map((item) => (
          <RenderVentasCollection sale={item} key={Math.random()} />
        ))
        .reverse()}
    </ScrollView>
  );
};

export default ReporteMes;
