import React from 'react';
import {View, Text, FlatList} from 'react-native';
import RenderVentasCollection from '../listItem';
import {moneyFormat} from '../mainFunctions';
import styles from '../listItem/listStyles';
import {ReportsBannerAd} from '../ads';

const MonthReports = ({route}) => {
  return (
    <FlatList 
      contentContainerStyle={styles.listaVentas}
      removeClippedSubviews={true}
      maxToRenderPerBatch={3}
      initialNumToRender={3}
      ListHeaderComponent={() => (<>
        <View style={styles.totalContainer}>
        <Text style={styles.totalSoldOut}>
          Vendido en el mes: {moneyFormat(route.params.total)}
        </Text>
        <Text style={styles.totalProfits}>
          Ganancias del mes: {moneyFormat(route.params.ganancias)}
        </Text>
      </View>
      <ReportsBannerAd />
      </>)}
      data={route.params.sales.reverse()}
      renderItem={({item}) => <RenderVentasCollection sale={item} />}
      keyExtractor={(item, index) => JSON.stringify(item + index + Math.random() * 1000)}
    />
  );
};

export default MonthReports;
