/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import store from '../../../store';
import {View, ScrollView, TextInput} from 'react-native';
import ShoppingCart from './shoppingCart';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCliente from './AddComponents/addCliente';
import AddProducto from './AddComponents/addProducto';
import AddServicio from './AddComponents/addServicio';
import CamScanner from './../CamScanner';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import {ProductItem, ServiceItem, ClientItem} from './items';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8903466117529509/6769370981';

const Stack = createStackNavigator();

const handleGetList = (snap, list, setList) => {
  if (!snap) {
    return;
  }
  let newList = list;
  snap.docChanges().forEach((change) => {
    const data = change.doc.data();
    switch (change.type) {
      case 'added':
        const filter = list.filter((item) => item.id === data.id);
        const isInList = filter.length > 0;
        if (!isInList) {
          newList = newList.concat(data);
        }
        break;
      case 'modified':
        newList = list.map((item) => (item.id === data.id ? data : item));
        break;
      case 'removed':
        newList = list.filter((item) => item.id !== data.id);
        break;
      default:
        break;
    }
  });
  if (JSON.stringify(list) !== JSON.stringify(newList)) {
    setList(newList);
  }
};

const Component = ({navigation}) => {
  const [searchedProduct, setFundProduct] = useState(null);
  const [searchedClient, setFundClient] = useState(null);
  const [searchedService, setFundService] = useState(null);
  const [products, setProducts] = useState(store.getState().products || []);
  const [clients, setClients] = useState(store.getState().clients || []);
  const [services, setServices] = useState(store.getState().services || []);

  const handleSetProduct = (list) => {
    setProducts(list);
    store.dispatch({
      type: 'SET_PRODUCTS',
      data: list,
    });
  };

  const handleSetClients = (list) => {
    setClients(list);
    store.dispatch({
      type: 'SET_CLIENTS',
      data: list,
    });
  };

  const handleSetServices = (list) => {
    setServices(list);
    store.dispatch({
      type: 'SET_SERVICES',
      data: list,
    });
  };

  useEffect(() => {
    const unsubscribeProducts = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('productos')
      .onSnapshot((snap) => handleGetList(snap, products, handleSetProduct));

    const unsubscribeClients = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('clientes')
      .onSnapshot((snap) => handleGetList(snap, clients, handleSetClients));

    const unsubscribeServices = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('servicios')
      .onSnapshot((snap) => handleGetList(snap, services, handleSetServices));

    return () => {
      unsubscribeProducts();
      unsubscribeClients();
      unsubscribeServices();
    };
  }, []);

  const filter = (list, search) => {
    const newList = list.filter((item) => {
      search = search.toLowerCase();
      const name = item.nombre.toLowerCase();
      const description = item.descripcion.toLowerCase();
      const brand = item.marca ? item.marca.toLowerCase() : '';
      return (
        name.includes(search) ||
        description.includes(search) ||
        brand.includes(search)
      );
    });
    return newList;
  };

  const Search = ({list, type}) => {
    let finded = [];
    if (type === 'products') {
      if (searchedProduct) {
        finded = filter(list, searchedProduct);
        return finded.map((product, index) => (
          <ProductItem data={product} index={index} key={product + index} />
        ));
      } else {
        return list.map((product, index) => (
          <ProductItem data={product} index={index} key={product + index} />
        ));
      }
    } else if (type === 'clients') {
      finded = filter(list, searchedClient);
      return finded.map((client, index) => (
        <ClientItem data={client} index={index} key={client + index} />
      ));
    } else if (type === 'services') {
      finded = filter(list, searchedClient);
      return finded.map((client, index) => (
        <ClientItem data={client} index={index} key={client + index} />
      ));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <View style={styles.textContainer}>
              <Icon
                name="barcode"
                style={styles.Icon}
                onPress={() =>
                  navigation.navigate('CamScanner', {
                    type: 'getProduct',
                  })
                }
              />
              <TextInput
                style={styles.txtInput}
                onChangeText={(text) => setFundProduct(text)}
                placeholder="Buscar producto"
              />
              <Icon
                name="plus"
                style={styles.Icon}
                onPress={() => navigation.navigate('Productos')}
              />
            </View>
            <ScrollView
              style={styles.findProductsList}
              showsVerticalScrollIndicator={false}>
              <Search list={products} type="products" />
            </ScrollView>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.textContainer}>
              <Icon
                name="close"
                style={styles.Icon}
                onPress={() => setFundClient('')}
              />
              <TextInput
                onChangeText={(text) => setFundClient(text)}
                style={styles.txtInput}
                placeholder="Buscar cliente"
              />
              <Icon
                name="plus"
                style={styles.Icon}
                onPress={() => navigation.navigate('Clientes')}
              />
            </View>
            <ScrollView
              style={styles.findProductsList}
              showsVerticalScrollIndicator={false}>
              {searchedClient ? <Search List={clients} type="clients" /> : null}
            </ScrollView>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.textContainer}>
              <Icon
                name="close"
                style={styles.Icon}
                onPress={() => setFundService('')}
              />
              <TextInput
                style={styles.txtInput}
                onChangeText={(text) => setFundService(text)}
                placeholder="Buscar Servicio Adicional"
              />
              <Icon
                name="plus"
                style={styles.Icon}
                onPress={() => navigation.navigate('Servicios')}
              />
            </View>
            <ScrollView
              style={styles.findProductsList}
              showsVerticalScrollIndicator={false}>
              {searchedService ? (
                <Search List={services} type="services" />
              ) : null}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <BannerAd unitId={adUnitId} size={BannerAdSize.SMART_BANNER} />
      <ShoppingCart />
    </View>
  );
};

const NuevaVenta = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="index" component={Component} {...props} />
      <Stack.Screen name="Clientes" component={AddCliente} />
      <Stack.Screen name="Productos" component={AddProducto} />
      <Stack.Screen name="Servicios" component={AddServicio} />
      <Stack.Screen name="CamScanner" component={CamScanner} />
    </Stack.Navigator>
  );
};
export default NuevaVenta;
