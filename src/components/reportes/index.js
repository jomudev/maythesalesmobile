/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

async function getList() {
  try {
    return await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('ventas')
      .get();
  } catch (err) {
    console.log(err);
  }
}

const Index = ({navigation}) => {
  const [listaVentas, setListaVentas] = useState([]);
  const [listaMeses, setListaMeses] = useState([]);

  const setMeses = lista => {
    let mesAyuda = '';
    let newLista = [];
    lista.forEach(venta => {
      let mesVenta = moment(`${venta.fecha.split('-')[1]}`, 'MM').format(
        'MMMM YYYY',
      );
      return mesAyuda !== mesVenta
        ? (mesAyuda = mesVenta) && (newLista = newLista.concat(mesVenta))
        : null;
    });

    setListaMeses(newLista);
  };

  useEffect(() => {
    const unsubscribe = getList().then(res => {
      let newList = [];
      res.docs.forEach(doc => newList.push(doc.data()));
      setMeses(newList);
      setListaVentas(newList);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  const ListItem = ({item, fatherNavigation}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          fatherNavigation.navigate('reporteMes', {
            params: {
              ventas: listaVentas.filter(venta => {
                return moment(venta.fecha).format('MMMM YYYY') === item
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
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={{fontSize: 20, color: '#777'}}>
          Aquí se mostrara la lista de meses
        </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={listaMeses}
        renderItem={({item}) => ListItem({item, fatherNavigation: navigation})}
        keyExtractor={item => item + Math.random()}
      />
    </View>
  );
};
export default Index;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 20,
    elevation: 2,
  },
});
