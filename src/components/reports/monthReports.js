import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, View, Text, FlatList, RefreshControl} from 'react-native';
import RenderVentasCollection from '../listItem';
import {db, moneyFormat, getSaleDate, getMonthTotals} from '../mainFunctions';
import styles from '../listItem/listStyles';
import {ReportsBannerAd} from '../ads';

const initialCollectionValue = {
  collection: [],
  totalSoldOut: 0,
  totalProfits: 0,
}

const MonthReports = ({route}) => {
  const {month, monthData} = route.params;
  const [collection, setCollection] = useState(initialCollectionValue);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const filterBySold = (item) => item.estado;

  const getCollection = async () => {
    
    let collection = (await db('ventas').get())
    .docChanges().map((change) => change.doc.data());

    collection = collection.filter((doc) => {
        return getSaleDate(doc, 'MMMM') === month;
      });

      return {
        collection,
        totalSoldOut: getMonthTotals(collection.filter(filterBySold)).total,
        totalProfits: getMonthTotals(collection.filter(filterBySold)).profits,
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
      const {total, profits} = getMonthTotals(monthData.filter(filterBySold));
      setCollection({
        collection: monthData,
        totalSoldOut: total, 
        totalProfits: profits,
      });
  }, []);

  return (
    <FlatList 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.listaVentas}
      removeClippedSubviews={true}
      maxToRenderPerBatch={3}
      initialNumToRender={3}
      ListHeaderComponent={() => (<>
        <View style={styles.totalContainer}>
        <Text style={styles.totalSoldOut}>
          Vendido en el mes: {moneyFormat(collection.totalSoldOut)}
        </Text>
        <Text style={styles.totalProfits}>
          Ganancias del mes: {moneyFormat(collection.totalProfits)}
        </Text>
      </View>
      <ReportsBannerAd />
      </>)}
      data={collection.collection.reverse()}
      renderItem={({item}) => <RenderVentasCollection sale={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default MonthReports;
