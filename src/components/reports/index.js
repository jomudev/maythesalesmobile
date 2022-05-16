import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import EmptyListImages from '../emptyListImage';
import LoadingScreen from '../loadingScreen';
import Sale from '../Classes/sale';
import Years from './Years'
import {ReportsBannerAd} from '../ads';
import store from '../../../store';


const itemStyle = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 16,
    marginBottom: 24,
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

const Index = ({navigation}) => {
  const [collection, setCollection] = React.useState(store.getState().collections.sales);

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCollection(new Years(store.getState().collections.sales));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const YearReportItem = (year) => {
    const yearData = collection.years[year];
    return (
      <TouchableOpacity
        style={itemStyle.container}
        onPress={() => {
            navigation.navigate('yearReports', {year: yearData.year, sales: yearData.sales});
          }}>
        <Text style={itemStyle.year}>{yearData.year}</Text>
        <View style={itemStyle.totalContainer}>
          <View style={itemStyle.totalTextContainer}>
            <Text style={itemStyle.amountValue}>{moneyFormat(yearData.total)}</Text>
            <Text style={itemStyle.totalTitle}>Total Vendido</Text>
          </View>
          <View style={itemStyle.totalTextContainer}>
            <Text style={itemStyle.amountValue}>{moneyFormat(yearData.ganancias)}</Text>
            <Text style={itemStyle.totalTitle}>Ganancias</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.keys(collection.years)}
        contentContainerStyle={styles.container}
        ListHeaderComponent={<ReportsBannerAd />}
        renderItem={({item}) => YearReportItem(item)}
        keyExtractor={(item) => item + Math.random() * 1000}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
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
