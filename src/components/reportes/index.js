/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {moneyFormat, db, getPeriodsReports} from '../mainFunctions';
import EmptyListImages from '../emptyListImage';
import {BannerAdvert} from '../ads';

const Index = ({navigation}) => {
  const [salesList, setSalesList] = useState([]);
  const [periodsList, setPeriods] = useState([]);

  useEffect(() => {
    const unsubscribe = db('ventas').onSnapshot(async (snap) => {
      let newSalesList = await db('ventas').get();
      newSalesList = newSalesList
        .docChanges()
        .map((change) => change.doc.data());
      setPeriods(getPeriodsReports(newSalesList));
      setSalesList(newSalesList);
    });
    return unsubscribe;
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

  if (periodsList.length < 1) {
    return (
      <View style={styles.container}>
        {EmptyListImages.default()}
        <Text style={{fontSize: 20, color: '#777', textAlign: 'center'}}>
          Todavía no hay ventas registradas.
        </Text>
        {/**
        <View style={styles.emptyListBannerAd}>
          <BannerAdvert />
        </View> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={periodsList}
        renderItem={ListItem}
        keyExtractor={(item) => item + Math.random()}
      />
      {/**
      <BannerAdvert /> */}
    </View>
  );
};
export default Index;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
  emptyListBannerAd: {
    position: 'absolute',
    bottom: 0,
  },
});
