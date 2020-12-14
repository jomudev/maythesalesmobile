/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import store from '../../../store';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import ShoppingCart from './shoppingCart';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCliente from './modalComponents/addCliente';
import AddProducto from './modalComponents/addProducto';
import AddServicio from './modalComponents/addServicio';
import CamScanner from './../CamScanner';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const handleGetList = (snap, list, setList) => {
  if (!snap.docChanges) {
    return; 
  }
  
  let newList = list;
  snap.docChanges().forEach((change) => {
    const data = change.doc.data();
    switch (change.type) {
      case 'added':
        const isInList = list.filter((item) => item.id === data.id)[0];
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

const NuevaVenta = (props) => {
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const unsubscribeProducts = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('productos')
      .onSnapshot((snap) => handleGetList(snap, products, setProducts));

    const unsubscribeClients = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('clientes')
      .onSnapshot((snap) => handleGetList(snap, clients, setClients));

    const unsubscribeServices = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('servicios')
      .onSnapshot((snap) => handleGetList(snap, services, setServices));

    return () => {
      unsubscribeProducts();
      unsubscribeClients();
      unsubscribeServices();
    };
  }, []);

  const itemStyles = StyleSheet.create({
    title: {fontSize: 16, fontWeight: 'bold'},
    subtitle: {
      fontSize: 12,
      color: '#aaa',
      fontWeight: 'bold',
      overflow: 'hidden',
      height: 30,
    },
  });

  // Item de lista de productos
  const ProductItem = ({data, index}) => (
    <TouchableOpacity
      key={data + index}
      style={styles.itemList}
      onPress={() => {
        store.dispatch({
          type: 'ADD_PRODUCT_TO_CART',
          product: data,
        });
      }}>
      <Text style={itemStyles.title}>
        {`${data.nombre} L${Number.parseFloat(data.precioVenta).toFixed(2)}`}
      </Text>
      {data.descripcion ? (
        <Text style={itemStyles.subtitle}>{data.marca}</Text>
      ) : null}
    </TouchableOpacity>
  );

  // Item de lista de servicios
  const ServiceItem = ({data, index}) => (
    <TouchableOpacity
      key={data + index}
      style={styles.itemList}
      onPress={() => {
        store.dispatch({
          type: 'ADD_SERVICE_TO_CART',
          service: data,
        });
      }}>
      <Text style={itemStyles.subtitle}>
        {`${data.nombre} L${Number.parseFloat(data.precioVenta).toFixed(2)}` +
          (data.descripcion ? ` ${data.descripcion}` : ' ')}
      </Text>
    </TouchableOpacity>
  );
  // Item de lista que muestra los clientes.
  const ClientItem = ({data, index}) => (
    <TouchableOpacity
      key={data + index}
      style={styles.itemList}
      onPress={() => {
        store.dispatch({
          type: 'SET_CART_CLIENT',
          clientData: data,
        });
      }}>
      <Text style={itemStyles.title}>{data.nombre}</Text>
      {data.telefono || data.email ? (
        <Text style={itemStyles.subtitle}>
          {data.telefono ? data.telefono : ''} {data.email ? data.email : ''}
        </Text>
      ) : null}
    </TouchableOpacity>
  );

  const Component = ({navigation, route}) => {
    const [searchedProduct, setFundProduct] = useState('');
    const [searchedClient, setFundClient] = useState('');
    const [searchedService, setFundService] = useState('');
    if (route.params) {
      store.dispatch({
        type: 'ADD_PRODUCT_TO_CART',
        product: route.params.scannerProduct,
      });
    }
    const Search = ({List, type}) => {
      // Metodo que nos ayudara a buscar y retornar productos, clientes, etc. para poder seleccionar
      let newList = [];
      for (let i = 0; i < List.length; i++) {
        if (type === 'products') {
          const userSearchedProduct = searchedProduct.toLowerCase();
          const product = List[i];
          const nombre = product.nombre.toLowerCase();

          if (nombre.includes(userSearchedProduct)) {
            newList = newList.concat(product);
          }
        }
        if (type === 'clients') {
          const userSearchedClient = searchedClient.toLowerCase();
          const client = List[i];
          const nombre = client.nombre.toLowerCase();

          if (nombre.includes(userSearchedClient)) {
            newList = newList.concat(client);
          }
        }
        if (type === 'services') {
          const userSearchedService = searchedService.toLowerCase();
          const Service = List[i];
          const nombre = Service.nombre.toLowerCase();

          if (nombre.includes(userSearchedService)) {
            newList = newList.concat(Service);
          }
        }
      }
      if (type === 'clients') {
        return newList.map((item, index) => (
          <ClientItem data={item} index={index} key={item + index} />
        ));
      }
      if (type === 'products') {
        return newList.map((item, index) => (
          <ProductItem data={item} index={index} key={item + index} />
        ));
      }
      if (type === 'services') {
        return newList.map((item, index) => (
          <ServiceItem data={item} index={index} key={item + index} />
        ));
      }

      return null;
    };

    return (
      <>
        <View style={{...styles.container, ...styles.form}}>
          <View style={styles.formGroup}>
            <View style={styles.textContainer}>
              <Icon
                name="barcode"
                style={styles.Icon}
                onPress={() => navigation.navigate('CamScanner', {type: 'get'})}
              />
              <TextInput
                value={searchedProduct}
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
              <Search List={products} type="products" />
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
                value={searchedClient}
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
                value={searchedService}
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
        <ShoppingCart />
      </>
    );
  };
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
