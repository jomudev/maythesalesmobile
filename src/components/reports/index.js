import React from 'react';
import {
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import EmptyListImages from '../emptyListImage';
import YearReportItem from './yearReportItem';
import {ReportsBannerAd} from '../ads';
import store from '../../../store';
import styles from './styles';

const emptyListImages = new EmptyListImages();

const Index = ({navigation}) => {
  const [reports, setReports] = React.useState(store.getState().reports);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setReports(store.getState().reports);
    setRefreshing(false);
  });

  if (!reports) {
    return  emptyListImages.default();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(reports.reports).reverse()}   
        onRefresh={() => onRefresh}
        refreshing={refreshing}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <YearReportItem data={item} navigation={navigation}/>
          )}
      />
    </View>
  )
};

export default Index;