/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import store from '../../../store';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

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
    let state = store.getState();
    setMeses(state.ventas);
    setListaVentas(state.ventas);
    const unsubscribe = store.subscribe(() => {
      state = store.getState();
      if (listaVentas.length !== state.ventas.length) {
        setMeses(state.ventas);
        setListaVentas(state.ventas);
      }
    });
    return unsubscribe();
  }, [listaVentas.length]);

  const ListItem = ({item, fatherNavigation}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          fatherNavigation.navigate('reporteMes', {
            params: {
              ventas: listaVentas.filter(venta => {
                return moment(`${venta.fecha.split('-')[1]}`, 'MM').format(
                  'MMMM YYYY',
                ) === item
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
      <View style={{alignContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 16, color: '#777'}}>
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
