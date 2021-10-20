import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {moneyFormat, db, orderReportsBy} from '../mainFunctions';
import EmptyListImages from '../emptyListImage';
import LoadingScreen from '../loadingScreen';
import {ReportsBannerAd} from '../ads';

const ListItemStyles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 32,
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  content: {
    backgroundColor: '#FFF',
    overflow: 'hidden',
    paddingVertical: 24,
  },
  header: {
    width: '100%',
    paddingHorizontal: 8,
  },
  body: {
    paddingHorizontal: 16,
    width: '100%',
  },
  month: {fontSize: 36, textAlign: 'center', marginBottom: 16},
  amounts: {
    flexDirection: 'row',
  },
  amount: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountTitle: {
    fontSize: 12,
    color: 'gray',
  },
  amountValue: {
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  }
});

const getSalesCollection = async (actualYear) => {
  let salesCollection = (await db('ventas').get())
    .docChanges()
    .map((change) => change.doc.data());
    return orderReportsBy('MMMM', salesCollection).reverse();
};

const YearReports = ({navigation, route}) => {
  const [collection, setCollection] = useState([]);
  const year = route.params.year;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getSalesCollection(year).then((response) => {
      setCollection(response);
    });
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = db('ventas').onSnapshot(() => {
      getSalesCollection()
      .then((response) => {
        setCollection(response);
        setLoading(false);
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const MonthReportItem = ({item}) => {
    return (
      <TouchableOpacity
        style={ListItemStyles.container}
        onPress={() =>
          navigation.navigate('monthReports', {month: item.month})
        }>
        <Text style={ListItemStyles.month}>{item.month.toUpperCase()}</Text>
        <View style={ListItemStyles.amounts}>
        <View style={ListItemStyles.amount}>
          <Text style={ListItemStyles.amountValue}>{moneyFormat(item.totalSold)}</Text>
          <Text style={ListItemStyles.amountTitle}>Total vendido</Text>
        </View>
        <View style={ListItemStyles.amount}>
        <Text style={ListItemStyles.amountValue}>{moneyFormat(item.totalProfits)}</Text>
        <Text style={ListItemStyles.amountTitle}>Ganancias</Text>
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={collection}
        ListHeaderComponent={
      <ReportsBannerAd />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={MonthReportItem}
        keyExtractor={(item) => item + Math.random()}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            {EmptyListImages.default()}
            <Text style={styles.emptyListText}>
              Todavía no hay ventas registradas.
            </Text>
            <View style={styles.emptyListBannerAd}>
              <ReportsBannerAd />
            </View>
          </View>
        )}
      />
    </SafeAreaView >
  );
};
export default YearReports;

const styles = StyleSheet.create({
  emptyListBannerAd: {
    position: 'absolute',
    bottom: 0,
  },
  emptyListContainer: {
    alignSelf: 'center',
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
    position: 'absolute',
  },
});