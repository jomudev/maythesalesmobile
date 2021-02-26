/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {moneyFormat, getSales, db, getPeriodsReports} from '../mainFunctions';
import {BannerAdvert} from '../ads';

const Index = ({navigation}) => {
  const [salesList, setSalesList] = useState([]);
  const [periodsList, setPeriods] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = db('ventas').onSnapshot(async (snap) => {
        const newSalesList = await getSales(snap, salesList);
        setPeriods(getPeriodsReports(newSalesList));
        setSalesList(newSalesList);
      });
      return unsubscribe;
    } catch (err) {
      console.warn('error trying to get monthly report', err);
    }
  }, [salesList]);

  const ListItem = ({item}) => {
    const ListItemStyles = StyleSheet.create({
      container: {
        width: '50%',
        padding: 5,
      },
      content: {
        backgroundColor: '#f2f3f4',
        borderRadius: 15,
        overflow: 'hidden',
      },
      header: {
        width: '100%',
        padding: 10,
      },
      body: {
        padding: 15,
        width: '100%',
      },
      year: {fontSize: 28, textAlign: 'center'},
      month: {color: '#777'},
      total: {fontSize: 12},
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
            <Text style={ListItemStyles.year}>{item.period.split(' ')[1]}</Text>
          </View>
          <View style={ListItemStyles.body}>
            <Text style={ListItemStyles.month}>
              {item.period.split(' ')[0]}
            </Text>
            <Text style={ListItemStyles.total}>
              total vendido: {moneyFormat(item.total)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (periodsList.length < 1) {
    return (
      <View style={styles.container}>
        <Text
          style={{fontSize: 20, color: '#777', textAlignVertical: 'center'}}>
          Todavía no hay ventas registradas
        </Text>
        <View style={styles.emptyListBannerAd}>
          <BannerAdvert />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        numColumns={2}
        contentContainerStyle={styles.listStyle}
        data={periodsList}
        renderItem={ListItem}
        keyExtractor={(item) => item + Math.random()}
      />
      <BannerAdvert />
    </View>
  );
};
export default Index;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  flatList: {
    width: '100%',
    padding: 10,
  },
  listStyle: {
    ...StyleSheet.absoluteFill,
  },
  emptyListBannerAd: {
    position: 'absolute',
    bottom: 0,
  },
});
