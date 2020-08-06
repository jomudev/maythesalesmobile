/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Badge} from '../Inventario/data';
import firestore from '@react-native-firebase/firestore';
import store from '../../../store';

const Ventas = () => {
  const [ventasDia, setVentasDia] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);

  useEffect(() => {
    const date = new Date();
    const fechaActual = `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;
    const subscriber = firestore()
      .collection('users')
      .doc(store.getState().user.uid)
      .collection('ventas')
      .onSnapshot(snap => {
        if (snap) {
          let ventasList = [];
          let total = 0;
          snap.docChanges().forEach(change => {
            const data = change.doc.data();
            if (change.type === 'added') {
              ventasList = ventasList.concat(data);
              total += Number(data.total);
            }
            if (change.type === 'modified') {
              for (let i = 0; i < ventasList.length; i++) {
                if (ventasList[i].id === snap.doc.data().id) {
                  ventasList.splice(i, 1, data);
                  total -= ventasList[i].total;
                  total += data.total;
                }
              }
            }
            if (change.type === 'removed') {
              for (let i = 0; i < ventasList.length; i++) {
                if (ventasList[i].id === snap.doc.data().id) {
                  total -= Number(data.total);
                  ventasList.splice(i, 1);
                }
              }
            }
          });
          setVentasDia(ventasList);
          setTotalVentas(total);
        }
      });

    return subscriber();
  }, []);

  const ListItem = ({item, index}) => (
    <View style={styles.ventaCard} key={item + index}>
      <Text style={styles.ventasTitle}>
        {item.cliente.nombre ? item.cliente.nombre : 'Anonimo '}
      </Text>
      {item.lista.map((data, i) => (
        <View key={data + i} style={{flexDirection: 'row'}}>
          <Text style={{width: '35%', textAlign: 'left'}}>{`${data.cantidad} ${
            data.nombre
          } ${Badge}${data.ventaP_U}`}</Text>
          <View style={{width: '30%'}} />
          <Text
            style={{
              width: '35%',
              textAlign: 'right',
            }}>{`subtotal: ${data.ventaP_U * data.cantidad}`}</Text>
        </View>
      ))}
      <View style={{flexDirection: 'row', width: '100%'}}>
        <Text
          style={{
            fontWeight: 'bold',
            width: '100%',
            textAlign: 'right',
          }}>
          Total: {Badge + item.total}
        </Text>
      </View>
    </View>
  );

  if (ventasDia.length < 1) {
    return (
      <SafeAreaView
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
          height: '100%',
        }}>
        <Text style={{color: 'gray', fontSize: 28, textAlign: 'center'}}>
          Aquí se mostraran las ventas del día
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <ScrollView style={{height: '100%'}}>
      <View
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderColor: '#ddd',
          flexDirection: 'row',
        }}>
        <Text style={{width: '50%'}}>Total vendido: </Text>
        <Text style={{width: '50%', textAlign: 'right'}}>
          {Badge + Number.parseFloat(totalVentas).toFixed(2)}
        </Text>
      </View>
      {ventasDia.map((item, index) => {
        return ListItem({item, index});
      })}
    </ScrollView>
  );
};

export default Ventas;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    width: '100%',
    padding: 2,
    maxWidth: 600,
    alignContent: 'center',
    alignItems: 'center',
  },
  formGroup: {
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  centeredViewShowData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  modalViewShowData: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  formTitle: {
    fontSize: 46,
    marginBottom: 50,
  },
  btnFormText: {
    fontSize: 24,
    marginLeft: 25,
  },
  findProductsList: {
    width: '100%',
    padding: 3,
  },
  itemList: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    margin: 2,
  },
  txtInput: {
    width: '95%',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#eee',
    paddingHorizontal: 32,
    paddingVertical: 2,
    margin: 5,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '98%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ventaBtn: {
    flexDirection: 'row',
    padding: 10,
    margin: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    borderBottomWidth: 2,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  ventasTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#cbc6c3',
  },
  ventaCard: {
    borderWidth: 1,
    borderColor: '#cbc6c3',
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 10,
    borderRadius: 4,
  },
});
