/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {moneyFormat, db, getPeriodsReports} from '../mainFunctions';
import EmptyListImages from '../emptyListImage';
import LoadingScreen from '../loadingScreen';
import {BannerAdvert} from '../ads';

const Index = ({navigation}) => {
  const [salesList, setSalesList] = useState([]);
  const [periodsList, setPeriods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db('ventas').onSnapshot(async (snap) => {
      let newSalesList = await db('ventas').get();
      newSalesList = newSalesList
        .docChanges()
        .map((change) => change.doc.data());
      if (JSON.stringify(newSalesList) !== JSON.stringify(salesList)) {
        setPeriods(getPeriodsReports(newSalesList));
        setSalesList(newSalesList);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [salesList]);

  const ListItem = ({item}) => {
    const ListItemStyles = StyleSheet.create({
      container: {
        width: '100%',
      },
      content: {
        backgroundColor: '#e6e8f1',
        borderTopWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
      },
      header: {
        width: '100%',
        padding: 8,
      },
      body: {
        padding: 16,
        width: '100%',
      },
      month: {fontSize: 32, textTransform: 'uppercase', textAlign: 'center'},
      year: {color: '#777', fontSize: 24},
      total: {fontSize: 16},
    });

    return (
      <TouchableOpacity
        style={ListItemStyles.container}
        onPress={() =>
          navigation.navigate('reporteMes', {
            params: {
              month: item.period.split(' ')[1],
            },
          })
        }>
        <View style={ListItemStyles.content}>
          <View style={ListItemStyles.header}>
            <Text style={ListItemStyles.month}>
              {item.period.split(' ')[1]}
            </Text>
          </View>
          <View style={ListItemStyles.body}>
            <Text style={ListItemStyles.year}>{item.period.split(' ')[0]}</Text>
            <Text style={ListItemStyles.total}>
              total: {moneyFormat(item.total)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <BannerAdvert />
      <FlatList
        data={periodsList}
        renderItem={ListItem}
        keyExtractor={(item) => item + Math.random()}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            {EmptyListImages.default()}
            <Text style={styles.emptyListText}>
              Todavía no hay ventas registradas.
            </Text>
            <View style={styles.emptyListBannerAd}>
              <BannerAdvert />
            </View>
          </View>
        )}
      />
    </View>
  );
};
export default Index;

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
