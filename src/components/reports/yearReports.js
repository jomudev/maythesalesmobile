import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {moneyFormat} from '../mainFunctions';
import EmptyListImages from '../emptyListImage';
import {ReportsBannerAd} from '../ads';
import Months from './Months';

const itemStyle = StyleSheet.create({
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
    fontFamily: 'VarelaRound-Regular',
  },
  amountValue: {
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  }
});

const YearReports = ({navigation, route}) => {
  const months = new Months(route.params.sales, route.params.year);

  const MonthReportItem = (month) => {
    month = months.months[month];
    return (
      <TouchableOpacity
        style={itemStyle.container}
        onPress={() =>
          navigation.navigate('monthReports', {
            month: month.month,
            total: month.total,
            ganancias: month.ganancias,
            sales: month.sales,
          })
        }>
        <Text style={itemStyle.month}>{month.month.toUpperCase()}</Text>
        <View style={itemStyle.amounts}>
        <View style={itemStyle.amount}>
          <Text style={itemStyle.amountValue}>{moneyFormat(month.total)}</Text>
          <Text style={itemStyle.amountTitle}>Total vendido</Text>
        </View>
        <View style={itemStyle.amount}>
        <Text style={itemStyle.amountValue}>{moneyFormat(month.ganancias)}</Text>
        <Text style={itemStyle.amountTitle}>Ganancias</Text>
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.keys(months.months).reverse()}
        ListHeaderComponent={<ReportsBannerAd />}
        renderItem={({item}) => MonthReportItem(item)}
        keyExtractor={(item) => item + Math.random() * 1000}
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