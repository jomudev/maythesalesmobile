/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import store from '../../../store';
import {View, ScrollView, Text, TextInput} from 'react-native';
import ShoppingCart from './shoppingCart';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCliente from '../AddComponents/addCliente';
import AddProducto from '../AddComponents/addProducto';
import AddServicio from '../AddComponents/addServicio';
import AddWholesaler from '../AddComponents/addWholesaler';
import CamScanner from './../CamScanner';
import {ProductItem, ServiceItem, ClientItem, WholesalerItem} from './items';
import {filterItems} from '../mainFunctions';
import {BannerAdvert} from '../ads';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const handleGetList = (snap, list, setList) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

const Component = ({navigation}) => {
  const [foundProduct, setFindProduct] = useState(null);
  const [foundClient, setFindClient] = useState(null);
  const [foundService, setFindService] = useState(null);
  const [foundWholesaler, setFindWholesaler] = useState(null);
  const [products, setProducts] = useState(store.getState().products || []);
  const [clients, setClients] = useState(store.getState().clients || []);
  const [services, setServices] = useState(store.getState().services || []);
  const [wholesalers, setWholesalers] = useState(
    store.getState().wholesalers || [],
  );

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

  const handleSetWholesalers = (list) => {
    setWholesalers(list);
    store.dispatch({
      type: 'SET_WHOLESALERS',
      data: list,
    });
  };

  useEffect(() => {
    try {
      const db = firestore().collection('negocios').doc(auth().currentUser.uid);
      const unsubscribeProducts = db
        .collection('productos')
        .onSnapshot((snap) => handleGetList(snap, products, handleSetProduct));

      const unsubscribeClients = db
        .collection('clientes')
        .onSnapshot((snap) => handleGetList(snap, clients, handleSetClients));

      const unsubscribeServices = db
        .collection('servicios')
        .onSnapshot((snap) => handleGetList(snap, services, handleSetServices));

      const unsubscribeWholesalers = db
        .collection('mayoristas')
        .onSnapshot((snap) =>
          handleGetList(snap, wholesalers, handleSetWholesalers),
        );

      return () => {
        unsubscribeProducts();
        unsubscribeClients();
        unsubscribeServices();
        unsubscribeWholesalers();
      };
    } catch (err) {
      console.warn('error al intentar obtener los registros', err);
    }
  }, [clients, products, services, wholesalers]);

  const Search = ({list, type}) => {
    let found = [];
    if (type === 'products') {
      if (foundProduct) {
        found = list.filter((item) => filterItems(item, foundProduct));
        return found.map((product, index) => (
          <ProductItem
            data={product}
            index={index}
            key={JSON.stringify(product) + index}
          />
        ));
      } else {
        return list.map((product, index) => (
          <ProductItem
            data={product}
            index={index}
            key={JSON.stringify(product) + index}
          />
        ));
      }
    } else if (type === 'clients') {
      found = list.filter((item) => filterItems(item, foundClient));
      return found.map((client, index) => (
        <ClientItem
          data={client}
          index={index}
          key={JSON.stringify(client) + index}
        />
      ));
    } else if (type === 'services') {
      found = list.filter((item) => filterItems(item, foundService));
      return found.map((service, index) => (
        <ServiceItem
          data={service}
          index={index}
          key={JSON.stringify(service) + index}
        />
      ));
    } else if (type === 'wholesalers') {
      found = list.filter((item) => filterItems(item, foundWholesaler));
      return found.map((wholesaler, index) => (
        <WholesalerItem
          data={wholesaler}
          index={index}
          key={JSON.stringify(wholesaler) + index}
        />
      ));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.screenTitle}>Realizar una venta</Text>
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
                onChangeText={(text) => setFindProduct(text)}
                value={foundProduct}
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
                onPress={() => setFindWholesaler('')}
              />
              <TextInput
                onChangeText={(text) => setFindWholesaler(text)}
                style={styles.txtInput}
                value={foundWholesaler}
                placeholder="Buscar mayorista"
              />
              <Icon
                name="plus"
                style={styles.Icon}
                onPress={() => navigation.navigate('Mayoristas')}
              />
            </View>
            <ScrollView
              style={styles.findProductsList}
              showsVerticalScrollIndicator={false}>
              {foundWholesaler ? (
                <Search list={wholesalers} type="wholesalers" />
              ) : null}
            </ScrollView>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.textContainer}>
              <Icon
                name="close"
                style={styles.Icon}
                onPress={() => setFindClient('')}
              />
              <TextInput
                onChangeText={(text) => setFindClient(text)}
                style={styles.txtInput}
                value={foundClient}
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
              {foundClient ? <Search list={clients} type="clients" /> : null}
            </ScrollView>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.textContainer}>
              <Icon
                name="close"
                style={styles.Icon}
                onPress={() => setFindService('')}
              />
              <TextInput
                style={styles.txtInput}
                value={foundService}
                onChangeText={(text) => setFindService(text)}
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
              {foundService ? <Search list={services} type="services" /> : null}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <BannerAdvert />
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
      <Stack.Screen name="Mayoristas" component={AddWholesaler} />
      <Stack.Screen name="CamScanner" component={CamScanner} />
    </Stack.Navigator>
  );
};
export default NuevaVenta;
