/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';
import {Badge, FormOptions, ClientsData, Ventas} from './data';
import {
  AddClient,
  AddProduct,
  AddService,
  AddProvider,
} from './modalComponents';
import {ShowComponent} from './showInformacion';
import {ShoppingCart} from './inventarioComponents';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../../../store';

const modalContent: () => React$Node = (modal, setModalValue) => {
  if (modal.mode === 'ADD') {
    switch (modal.type) {
      // Componenetes para agregar al Inventario
      case 'ADD_CLIENT':
        return <AddClient setModalValue={setModalValue} />;
      case 'ADD_PRODUCT':
        return <AddProduct setModalValue={setModalValue} />;
      case 'ADD_SERVICE':
        return <AddService setModalValue={setModalValue} />;
      case 'ADD_PROVIDER':
        return <AddProvider setModalValue={setModalValue} />;
      // Componentes para mostrar la info. del invtario.
    }
  } else if (modal.mode === 'SHOW') {
    return <ShowComponent setModalValue={setModalValue} type={modal.type} />;
  }
};

const FormInventario: () => React$Node = () => {
  const [modalValue, setModalValue] = useState({
    type: '',
    mode: null,
    visible: false,
  });
  return (
    <View style={styles.form}>
      <View
        style={styles.centeredView}
        onPress={() => setModalValue({visible: false})}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalValue.visible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {modalContent(modalValue, setModalValue)}
            </View>
          </View>
        </Modal>
      </View>
      {FormOptions.map((item, index) => (
        <TouchableOpacity
          key={item + index}
          style={styles.ventaBtn}
          onPress={() =>
            setModalValue({type: item.funcType, mode: 'ADD', visible: true})
          }>
          <Icon name={item.icon} size={36} color="#5d80b6" />
          <Text style={styles.btnFormText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
      <Text>p/u: por unidad - p/m: por mayoria</Text>
    </View>
  );
};

const NuevaVenta: () => React$Node = () => {
  const [searchedProduct, setFundProduct] = useState('');
  const [searchedClient, setFundClient] = useState('');
  const [products, setProducts] = useState([]);

  store.subscribe(() => {
    console.log(store.getState().cart);
    if (products !== store.getState().products) {
      setProducts(store.getState().products);
    }
  });

  const ProductItem: () => Rect$Node = ({data, index}) => (
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
        {data.nombre + ' ' + data.ventaP_U + ' ' + Badge}
      </Text>
    </TouchableOpacity>
  );

  // Item de lista que muestra los clientes.
  const ClientItem: () => Rect$Node = ({data, index}) => (
    <TouchableOpacity
      key={data + index}
      style={styles.itemList}
      onPress={() => {
        store.dispatch({
          type: 'SET_CART_CLIENT',
          clientData: data,
        });
      }}>
      <Text style={{fontSize: 14}}>
        {data.nombre +
          ' ' +
          (data.telefono ? 'cel: ' + data.telefono : '') +
          (data.email ? 'email: ' + data.email : '')}
      </Text>
    </TouchableOpacity>
  );

  const Search: () => React$Product = ({List, type}) => {
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
          placeholder="Cliente"
        />
        <View style={styles.findProductsList}>
          {searchedClient ? <Search List={ClientsData} type="clients" /> : null}
        </View>
      </View>
      <View style={styles.formGroup}>
        <TextInput
          value={searchedProduct}
          style={styles.txtInput}
          onChangeText={text => setFundProduct(text)}
          placeholder="Producto"
        />
        <View style={styles.findProductsList}>
          <Search List={products} type="products" />
        </View>
      </View>
      <ShoppingCart />
    </View>
  );
};

const VentasDia: () => React$Node = () => {
  return (
    <ScrollView>
      {Ventas.map((item, index) => (
        <View key={item + index} style={styles.ventaCard}>
          <Text style={{fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>
            {item.fechaLarga}
          </Text>
          {item.listaProductos.map((data, i) => (
            <View key={data + i}>
              <Text>{data.nombre + ' ' + Badge + data.ventaP_U}</Text>
            </View>
          ))}
          <Text style={{fontWeight: 'bold'}}>
            {'\n'}Total: {Badge + item.totalVenta}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const Inventario: () => React$Node = () => {
  const [modalValue, setModalValue] = useState({type: '', visible: false});
  return (
    <View style={styles.form}>
      <View
        style={styles.centeredView}
        onPress={() => setModalValue({visible: false})}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalValue.visible}>
          <View style={styles.centeredViewShowData}>
            <View style={styles.modalViewShowData}>
              {modalContent(modalValue, setModalValue)}
            </View>
          </View>
        </Modal>
      </View>
      {FormOptions.map((item, index) => (
        <TouchableOpacity
          key={index + item}
          style={styles.ventaBtn}
          onPress={() =>
            setModalValue({type: item.type, mode: 'SHOW', visible: true})
          }>
          <Icon name={item.icon} size={36} color="#5d80b6" />
          <Text style={styles.btnFormText}>{item.type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export {FormInventario, VentasDia, Inventario, NuevaVenta};

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
    fontSize: 28,
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
  },
  ventaCard: {
    borderWidth: 1,
    borderColor: '#cbc6c3',
    margin: 5,
    padding: 10,
    borderRadius: 4,
  },
});
