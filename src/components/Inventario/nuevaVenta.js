/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import store from '../../../store';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import ShoppingCart from './shoppingCart';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddCliente from './modalComponents/addCliente';
import AddProducto from './modalComponents/addProducto';
import AddServicio from './modalComponents/addServicio';
import CamScanner from './../CamScanner';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

async function getData(type) {
  try {
    const uid = auth().currentUser.uid;
    return await firestore()
      .collection('users')
      .doc(uid)
      .collection(type)
      .get();
  } catch (err) {
    console.log(err);
  }
}

const NuevaVenta = props => {
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Escucha para obterner clientes y productos
    const productUnsubcriber = getData('productos').then(res => {
      const productos = res.docs.map(doc => doc.data());
      setProducts(productos);
    });

    const clientesUnsubcriber = getData('clientes').then(res => {
      const clientes = res.docs.map(doc => doc.data());
      setClients(clientes);
    });

    const serviciosUnsubcriber = getData('servicios').then(res => {
      const servicios = res.docs.map(doc => doc.data());
      setServices(servicios);
    });

    return () => {
      productUnsubcriber;
      clientesUnsubcriber;
      serviciosUnsubcriber;
    };
  }, []);

  const phoneFormat = number => {
    return number
      .split('')
      .map((d, i) => (i === 4 ? `-${d}` : d))
      .join('');
  };
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
      <Text style={{fontSize: 14}}>
        {`${data.nombre} L${Number.parseFloat(data.ventaP_U).toFixed(2)}` +
          (data.descripcion ? ` ${data.descripcion}` : ' ')}
      </Text>
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
      <Text style={{fontSize: 14}}>
        {`${data.nombre} L${Number.parseFloat(data.ventaP_U).toFixed(2)}` +
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
      <Text style={{fontSize: 14, flexDirection: 'column'}}>
        {data.nombre +
          (data.telefono ? ' cel: ' + phoneFormat(data.telefono) : ' ') +
          (data.email ? ' email: ' + data.email : ' ')}
      </Text>
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
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <View style={styles.textContainer}>
            <Icon
              name="view-week"
              style={styles.Icon}
              onPress={() => navigation.navigate('CamScanner', {type: 'get'})}
            />
            <TextInput
              value={searchedProduct}
              style={styles.txtInput}
              onChangeText={text => setFundProduct(text)}
              placeholder="Buscar producto"
            />
            <Icon
              name="add"
              style={styles.Icon}
              onPress={() => navigation.navigate('addProducto')}
            />
          </View>
          <ScrollView style={styles.findProductsList}>
            <Search List={products} type="products" />
          </ScrollView>
        </View>
        <View style={styles.formGroup}>
          <View style={styles.textContainer}>
            <TextInput
              value={searchedClient}
              onChangeText={text => setFundClient(text)}
              style={styles.txtInput}
              placeholder="Buscar cliente"
            />
            <Icon
              name="add"
              style={styles.Icon}
              onPress={() => navigation.navigate('addCliente')}
            />
          </View>
          <ScrollView style={styles.findProductsList}>
            {searchedClient ? <Search List={clients} type="clients" /> : null}
          </ScrollView>
        </View>
        <View style={styles.formGroup}>
          <View style={styles.textContainer}>
            <TextInput
              value={searchedService}
              style={styles.txtInput}
              onChangeText={text => setFundService(text)}
              placeholder="Buscar Servicio Adicional"
            />
            <Icon
              name="add"
              style={styles.Icon}
              onPress={() => navigation.navigate('addServicio')}
            />
          </View>
          <ScrollView style={styles.findProductsList}>
            {searchedService ? (
              <Search List={services} type="services" />
            ) : null}
          </ScrollView>
        </View>
        <ShoppingCart />
      </View>
    );
  };
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="index" component={Component} {...props} />
      <Stack.Screen name="addCliente" component={AddCliente} />
      <Stack.Screen name="addProducto" component={AddProducto} />
      <Stack.Screen name="addServicio" component={AddServicio} />
      <Stack.Screen name="CamScanner" component={CamScanner} />
    </Stack.Navigator>
  );
};
export default NuevaVenta;
