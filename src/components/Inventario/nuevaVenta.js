/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import store from '../../../store';
import {View, ScrollView, Text, TextInput, SafeAreaView} from 'react-native';
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
    console.warn('error trying to get the inventory list ', err);
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
      console.warn('error trying to get the inventory', err);
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
        return list.length === 0 ? (
          <Text style={styles.emptySearch}>
            Agrega productos al inventario para poder verlos aquí.
          </Text>
        ) : (
          list.map((product, index) => (
            <ProductItem
              data={product}
              index={index}
              key={JSON.stringify(product) + index}
            />
          ))
        );
      }
    } else if (type === 'clients') {
      found = list.filter((item) => filterItems(item, foundClient));
      return found.length === 0 ? (
        <Text style={styles.emptySearch}>No se encontró ningún registro.</Text>
      ) : (
        found.map((client, index) => (
          <ClientItem
            data={client}
            index={index}
            key={JSON.stringify(client) + index}
          />
        ))
      );
    } else if (type === 'services') {
      found = list.filter((item) => filterItems(item, foundService));
      return found.length === 0 ? (
        <Text style={styles.emptySearch}>No se encontró ningún registro.</Text>
      ) : (
        found.map((service, index) => (
          <ServiceItem
            data={service}
            index={index}
            key={JSON.stringify(service) + index}
          />
        ))
      );
    } else if (type === 'wholesalers') {
      found = list.filter((item) => filterItems(item, foundWholesaler));
      return found.length === 0 ? (
        <Text style={styles.emptySearch}>No se encontró ningún registro.</Text>
      ) : (
        found.map((wholesaler, index) => (
          <WholesalerItem
            data={wholesaler}
            index={index}
            key={JSON.stringify(wholesaler) + index}
          />
        ))
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.form}>
          {products.length < 1 &&
          services.length < 1 &&
          clients.length < 1 &&
          wholesalers.length < 1 ? (
            <Text>
              Agrega registros a tu inventario y realiza ventas añadiendolos al carrito.
            </Text>
          ) : (
            <Text>
              selecciona productos o servicios para añadirlos al carrito.
            </Text>
          )}
          <View style={styles.formGroup}>
            <View style={styles.textContainer}>
              <Icon
                name="barcode-scan"
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
                placeholder="Busca o selecciona un producto"
              />
              {foundProduct ? (
                <Icon
                  name="close"
                  style={styles.Icon}
                  onPress={() => setFindProduct('')}
                />
              ) : (
                <Icon
                  name="plus"
                  style={styles.Icon}
                  onPress={() => navigation.navigate('Productos')}
                />
              )}
            </View>
            <ScrollView
              style={styles.findProductsList}
              showsVerticalScrollIndicator={false}>
              <Search list={products} type="products" />
            </ScrollView>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.textContainer}>
              <TextInput
                onChangeText={(text) => setFindWholesaler(text)}
                style={styles.txtInput}
                value={foundWholesaler}
                placeholder="Buscar un mayorista"
              />
              {foundWholesaler ? (
                <Icon
                  name="close"
                  style={styles.Icon}
                  onPress={() => setFindWholesaler('')}
                />
              ) : (
                <Icon
                  name="plus"
                  style={styles.Icon}
                  onPress={() => navigation.navigate('Mayoristas')}
                />
              )}
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
              <TextInput
                onChangeText={(text) => setFindClient(text)}
                style={styles.txtInput}
                value={foundClient}
                placeholder="Buscar un cliente"
              />
              {foundClient ? (
                <Icon
                  name="close"
                  style={styles.Icon}
                  onPress={() => setFindClient('')}
                />
              ) : (
                <Icon
                  name="plus"
                  style={styles.Icon}
                  onPress={() => navigation.navigate('Clientes')}
                />
              )}
            </View>
            <ScrollView
              style={styles.findProductsList}
              showsVerticalScrollIndicator={false}>
              {foundClient ? <Search list={clients} type="clients" /> : null}
            </ScrollView>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.textContainer}>
              <TextInput
                style={styles.txtInput}
                value={foundService}
                onChangeText={(text) => setFindService(text)}
                placeholder="Buscar un Servicio Adicional"
              />
              {foundService ? (
                <Icon
                  name="close"
                  style={styles.Icon}
                  onPress={() => setFindService('')}
                />
              ) : (
                <Icon
                  name="plus"
                  style={styles.Icon}
                  onPress={() => navigation.navigate('Servicios')}
                />
              )}
            </View>
            <ScrollView
              style={styles.findProductsList}
              showsVerticalScrollIndicator={false}>
              {foundService ? <Search list={services} type="services" /> : null}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
      <ShoppingCart />
      <View style={{position: 'absolute', bottom: 0}}>
        <BannerAdvert />
      </View>
    </View>
  );
};

const NuevaVenta = (props) => {
  const MenuIcon = ({navigation}) => (
    <Icon
      style={styles.icon}
      name="menu"
      size={28}
      color="#101e5a"
      onPress={() => navigation.toggleDrawer()}
    />
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#103e5a',
        headerStyle: styles.header,
        headerLeft: () => <MenuIcon {...props} />,
      }}>
      <Stack.Screen
        name="index"
        options={{title: 'Realizar una venta'}}
        component={Component}
        {...props}
      />
      <Stack.Screen
        name="Clientes"
        options={{title: 'Añadir nuevo cliente'}}
        component={AddCliente}
      />
      <Stack.Screen
        name="Productos"
        options={{title: 'Añadir nuevo producto'}}
        component={AddProducto}
      />
      <Stack.Screen
        name="Servicios"
        options={{title: 'Añadir nuevo servicio adicional'}}
        component={AddServicio}
      />
      <Stack.Screen
        name="Mayoristas"
        options={{title: 'Añadir nuevo comprador mayorista'}}
        component={AddWholesaler}
      />
      <Stack.Screen
        name="CamScanner"
        options={{title: 'Escanear Codigo de barras'}}
        component={CamScanner}
      />
    </Stack.Navigator>
  );
};
export default NuevaVenta;
