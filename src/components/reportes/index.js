/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Index = ({navigation}) => {
  const [listaVentas, setListaVentas] = useState([]);
  const [listaMeses, setListaMeses] = useState([]);

  const setMeses = (lista) => {
    let mesAyuda = '';
    let newLista = [];
    lista.forEach((venta) => {
      let mesVenta = moment(venta.timestamp, 'x').format('MMMM YYYY');
      return mesAyuda !== mesVenta
        ? (mesAyuda = mesVenta) && (newLista = newLista.concat(mesVenta))
        : null;
    });

    setListaMeses(newLista.reverse());
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('ventas')
      .onSnapshot((snap) => {
        let newList = listaVentas;
        snap.docChanges().forEach((change) => {
          const docData = change.doc.data();
          switch (change.type) {
            case 'added':
              const isInList =
                newList.filter((item) => item.timestamp === docData.timestamp)
                  .length > 0;
              if (!isInList) {
                newList = newList.concat(docData);
              }
              break;
            case 'removed':
              newList = newList.filter((item) => item.id !== docData.id);
              break;
            default:
              break;
          }
        });
        if (JSON.stringify(listaVentas) !== JSON.stringify(newList)) {
          setListaVentas(newList);
          setMeses(newList);
        }
      });
    return () => {
      unsubscribe;
    };
  }, []);

  const ListItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('reporteMes', {
            params: {
              ventas: listaVentas.filter((venta) => {
                return moment(venta.timestamp, 'x').format('MMMM YYYY') === item
                  ? venta
                  : null;
              }),
            },
          })
        }>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          {item.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  if (listaMeses.length < 1) {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, color: '#777'}}>
          Todavia no hay ventas registradas
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.listStyle}
        data={listaMeses}
        renderItem={({item}) => ListItem({item})}
        keyExtractor={(item) => item + Math.random()}
      />
    </View>
  );
};
export default Index;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
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
    ...StyleSheet.absoluteFill,
  },
  listStyle: {
    ...StyleSheet.absoluteFill,
  },
});
