/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';
import {Badge, FormOptions, ProductData, ClientsData} from './data';
import {AddClient, CancelBtn, AddProduct} from './modalComponents';
import {ShoppingCart} from './inventarioComponents';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../../../store';

const modalContent: () => React$Node = (modal, setModalValue) => {
  switch (modal.type) {
    case 'ADD_CLIENT':
      return <AddClient setModalValue={setModalValue} />;
    case 'ADD_PRODUCT':
      return <AddProduct setModalValue={setModalValue} />;
    default:
      return <CancelBtn setModalValue={setModalValue} />;
  }
};

const FormInventario: () => React$Node = () => {
  const [modalValue, setModalValue] = useState({type: 'hola', visible: false});

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
          onPress={() => setModalValue({type: item.funcType, visible: true})}>
          <Icon name={item.icon} size={36} color="#5d80b6" />
          <Text style={styles.btnFormText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const NuevaVenta: () => React$Node = () => {
  const [searchedProduct, setFundProduct] = useState('undefined');
  const [searchedClient, setFundClient] = useState('undefined');

  const addProductToCart = data => {
    store.dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      product: data,
      cantidad: {pid: data.pid, cantidad: 1},
    });
  };

  const ProductItem: () => Rect$Node = ({data, index}) => (
    <TouchableOpacity
      key={data + index}
      style={styles.itemList}
      onPress={() => {
        addProductToCart(data);
      }}>
      <Text style={{fontSize: 14}}>
        {data.nombre + ' ' + data.valorVenta + ' ' + Badge}
      </Text>
    </TouchableOpacity>
  );

  const ClientItem: () => Rect$Node = ({data, index}) => (
    <TouchableOpacity key={data + index} style={styles.itemList}>
      <Text style={{fontSize: 14}}>
        {data.nombre + '     ' + (data.telefono ? 'cel: ' + data.telefono : '')}
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
          onChangeText={text => {
            if (!text) {
              setFundClient('undefined');
            } else {
              setFundClient(text);
            }
          }}
          style={styles.txtInput}
          placeholder="Cliente"
        />
        <View style={styles.findProductsList}>
          <Search List={ClientsData} type="clients" />
        </View>
      </View>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.txtInput}
          onChangeText={text => {
            if (!text) {
              setFundProduct('undefined');
            } else {
              setFundProduct(text);
            }
          }}
          placeholder="Producto"
        />
        <View style={styles.findProductsList}>
          <Search List={ProductData} type="products" />
        </View>
      </View>
      <ShoppingCart />
    </View>
  );
};

const VentasDia: () => React$Node = () => {
  return (
    <View>
      <Text>Ventas del día</Text>
    </View>
  );
};

const Inventario: () => React$Node = () => {
  return (
    <View style={styles.form}>
      {FormOptions.map((item, index) => (
        <TouchableOpacity
          key={index + item}
          style={styles.ventaBtn}
          onPress={() => console.log(item.type)}>
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
    borderBottomWidth: 2,
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
});
