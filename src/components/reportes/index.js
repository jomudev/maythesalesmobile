/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {moneyFormat, getSales} from '../mainFunctions';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const adUnitId = TestIds.BANNER;

const Index = ({navigation}) => {
  const [salesList, setSalesList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('ventas')
      .onSnapshot((snap) => {
        getSales(snap, salesList, setSalesList, setMonthsList);
      });

    return () => {
      unsubscribe;
    };
  }, []);

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
      month: {fontSize: 28, textAlign: 'center'},
      year: {color: '#777'},
      total: {fontSize: 12},
    });

    return (
      <TouchableOpacity
        style={ListItemStyles.container}
        onPress={() =>
          navigation.navigate('reporteMes', {
            params: {
              ventas: salesList.filter((venta) => {
                return moment(venta.timestamp, 'x').format('MMMM YYYY') ===
                  item.period
                  ? venta
                  : null;
              }),
            },
          })
        }>
        <View style={ListItemStyles.content}>
          <View style={ListItemStyles.header}>
            <Text style={ListItemStyles.month}>
              {item.period.split(' ')[0]}
            </Text>
          </View>
          <View style={ListItemStyles.body}>
            <Text style={ListItemStyles.year}>{item.period.split(' ')[1]}</Text>
            <Text style={ListItemStyles.total}>
              total vendido: {moneyFormat(item.total)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (monthsList.length < 1) {
    return (
      <View style={styles.container}>
        <Text
          style={{fontSize: 20, color: '#777', textAlignVertical: 'center'}}>
          Todavía no hay ventas registradas
        </Text>
        <View style={styles.emptyListBannerAd}>
          <BannerAd unitId={adUnitId} size={BannerAdSize.SMART_BANNER} />
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
        data={monthsList}
        renderItem={ListItem}
        keyExtractor={(item) => item + Math.random()}
      />
      <BannerAd unitId={adUnitId} size={BannerAdSize.SMART_BANNER} />
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
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
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
