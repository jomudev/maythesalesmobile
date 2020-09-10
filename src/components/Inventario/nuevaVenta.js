/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import store from '../../../store';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import ShoppingCart from './shoppingCart';
import styles from './styles';

const subscriberFunction = () => {
  return {
    clients: store.getState().clients,
    products: store.getState().products,
  };
};

const NuevaVenta = () => {
  const [searchedProduct, setFundProduct] = useState('');
  const [searchedClient, setFundClient] = useState('');
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Escucha para obterner clientes y productos
    const unsubscriber = store.subscribe(() => {
      if (products.length !== store.getState().products.length) {
        setProducts(subscriberFunction().products);
      }
      if (clients.length !== store.getState().clients.length) {
        setClients(subscriberFunction().clients);
      }
    });

    return unsubscriber;
  }, [clients, products]);

  const phoneFormat = number => {
    number = number
      .split('')
      .splice(4, 0, '-')
      .join('');
    return number;
  };
  const ProductItem = ({data, index}) => (
    <TouchableOpacity
      key={data + index}
      style={styles.itemList}
      onPress={() => {
        store.dispatch({
          type: 'ADD_PRODUCT_TO_CART',
          product: data,
          cantidad: {pid: data.pid, cantidad: 1},
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

    return null;
  };

  return (
    <View style={styles.form}>
      <View style={styles.formGroup}>
        <TextInput
          value={searchedClient}
          onChangeText={text => setFundClient(text)}
          style={styles.txtInput}
          placeholder="Buscar cliente"
        />
        <View style={styles.findProductsList}>
          {searchedClient ? <Search List={clients} type="clients" /> : null}
        </View>
      </View>
      <View style={styles.formGroup}>
        <TextInput
          value={searchedProduct}
          style={styles.txtInput}
          onChangeText={text => setFundProduct(text)}
          placeholder="Buscar producto"
        />
        <View style={styles.findProductsList}>
          <Search List={products} type="products" />
        </View>
      </View>
      <ShoppingCart />
    </View>
  );
};

export default NuevaVenta;
