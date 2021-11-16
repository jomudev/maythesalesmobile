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
import {db, sortCollection, moneyFormat, getYearTotals} from '../mainFunctions';
import EmptyListImages from '../emptyListImage';
import LoadingScreen from '../loadingScreen';
import {ReportsBannerAd} from '../ads';


const itemStyle = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 16,
    fontWeight: 'bold',
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
  totalContainer: {
    flexDirection: 'row',
  },
  totalTextContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalTitle: {
    color: 'gray',
    fontFamily: 'VarelaRound-Regular',
    fontSize: 12,
  },
  amountValue: {
    fontFamily: 'VarelaRound-Regular',
    fontWeight: 'bold',
  },
  year: {fontSize: 48, textAlign: 'center'},
});

const getSalesCollection = async () => {
  let salesCollection = (await db('ventas').get())
    .docChanges()
    .map((change) => change.doc.data());
    return sortCollection(salesCollection);
};

const Index = ({navigation}) => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getSalesCollection().then((response) => {
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

  const YearReportItem = (year) => {
    const {total, profits} = getYearTotals(collection[year]);
    return (
      <TouchableOpacity
        style={itemStyle.container}
        onPress={() => navigation.navigate('yearReports', {year, months: collection[year]})}>
        <Text style={itemStyle.year}>{year}</Text>
        <View style={itemStyle.totalContainer}>
          <View style={itemStyle.totalTextContainer}>
            <Text style={itemStyle.amountValue}>{moneyFormat(total)}</Text>
            <Text style={itemStyle.totalTitle}>Total Vendido</Text>
          </View>
          <View style={itemStyle.totalTextContainer}>
            <Text style={itemStyle.amountValue}>{moneyFormat(profits)}</Text>
            <Text style={itemStyle.totalTitle}>Ganancias</Text>
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
        data={Object.keys(collection)}
        contentContainerStyle={styles.container}
        ListHeaderComponent={<ReportsBannerAd />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item}) => YearReportItem(item)}
        keyExtractor={(item) => item + Math.random()}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            {EmptyListImages.default}
            <Text style={{color: 'gray'}}>
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
export default Index;

const styles = StyleSheet.create({
  emptyListBannerAd: {
    position: 'absolute',
    bottom: 0,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
    position: 'absolute',
  },
});
