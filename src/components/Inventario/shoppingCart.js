/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Animated,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../../../store';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

function postearVenta({productCart, servicesCart, total, cliente}) {
  const db = firestore();
  let todosProductosDisponibles = true;
  let productosNoDisponibles = [];

  productCart.forEach((item) => {
    db.runTransaction(async (t) => {
      let productNombre = item.nombre.toLocaleUpperCase();
      console.log(productNombre);
      const productRef = db
        .collection('negocios')
        .doc(auth().currentUser.uid)
        .collection('productos')
        .doc(productNombre);
      return t.get(productRef).then((doc) => {
        let cantidad = doc.data().cantidad;
        if (cantidad > 0) {
          cantidad -= item.cantidad;
          if (cantidad > 0) {
            return t.update(productRef, {
              cantidad,
            });
          }
        } else {
          todosProductosDisponibles = false;
          productosNoDisponibles = productosNoDisponibles.concat(item.nombre);
        }
      });
    });
  });
  if (todosProductosDisponibles) {
    const timestamp = moment().format('x');
    db.collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('ventas')
      .doc(timestamp)
      .set({
        timestamp,
        productos: productCart,
        servicios: servicesCart,
        total,
        cliente,
      });
  } else {
    Alert.alert(
      'Algunos productos no están disponibles',
      `los siguientes productos no están disponibles: ${productosNoDisponibles.join()}`,
    );
  }
}

function ShoppingCart() {
  const [productCart, setProductCart] = useState(store.getState().cart || []);
  const [servicesCart, setServicesCart] = useState(
    store.getState().servicesCart || [],
  );
  const [cliente, setCliente] = useState(store.getState().cartClient || null);
  const [total, setTotal] = useState(store.getState().total || 0);
  const [cartHeight, setCartHeight] = useState(0);
  const cartPosition = useRef(new Animated.Value(+500)).current;
  const [isOpen, setIsOpen] = useState(false);
  const [toggleIcon, setToggleIcon] = useState('keyboard-arrow-down');
  const [menuOpen, toggleMenu] = useState(false);

  const limpiarCampos = () => {
    store.dispatch({
      type: 'CLEAR_CART',
    });
  };

  const showCart = () => {
    Animated.spring(cartPosition, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setIsOpen(true);
    setToggleIcon('keyboard-arrow-down');
  };

  const hideCart = (full) => {
    Animated.spring(cartPosition, {
      toValue: full ? +500 : +cartHeight - 50,
      useNativeDriver: true,
    }).start();
    setIsOpen(false);
    setToggleIcon('keyboard-arrow-up');
  };

  const toggle = () => {
    if (isOpen) {
      hideCart();
    } else {
      showCart();
    }
  };

  const verifyCart = (productCartToVerify, servicesCartToVerify) => {
    const productCartAndServiceCartHaveProducts =
      productCartToVerify.length > 0 || servicesCartToVerify.length > 0;
    if (productCartAndServiceCartHaveProducts) {
      showCart();
    } else {
      hideCart(true);
    }
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      verifyCart(state.cart, state.servicesCart);
      if (state.cart !== productCart) {
        setProductCart(state.cart);
      }
      if (state.servicesCart !== servicesCart) {
        setServicesCart(state.servicesCart);
      }
      if (state.total !== total) {
        setTotal(state.total);
      }
      if (state.cartClient !== cliente) {
        setCliente(state.cartClient);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const ListHeader = ({title}) => (
    <View>
      <Text style={{fontWeight: 'bold'}}>{title}</Text>
    </View>
  );

  return (
    <Animated.View
      onLayout={(Event) => setCartHeight(Event.nativeEvent.layout.height)}
      style={{
        ...styles.container,
        translateY: cartPosition,
      }}>
      <View style={styles.cartHeader}>
        <Icon
          name={toggleIcon}
          style={styles.toggle}
          size={28}
          onPress={() => toggle()}
        />
        <Icon
          name="more-vert"
          size={28}
          style={styles.more}
          onPress={() => toggleMenu(!menuOpen)}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 1, fontSize: 18}}>
          Cliente: {cliente ? cliente.nombre : 'Anonimo'}
        </Text>
        <Text style={{flex: 1, textAlign: 'right', fontSize: 18}}>
          Total: L{Number.parseFloat(total).toFixed(2)}
        </Text>
      </View>
      {productCart.length > 0 ? (
        <FlatList
          ListHeaderComponent={() => <ListHeader title="Lista de productos" />}
          style={styles.cartBody}
          data={productCart}
          renderItem={({item}) => {
            return <ListItem item={item} />;
          }}
        />
      ) : null}
      {servicesCart.length > 0 ? (
        <FlatList
          ListHeaderComponent={() => <ListHeader title="Lista de servicios" />}
          style={styles.cartBody}
          data={servicesCart}
          renderItem={({item}) => {
            return <ListItem item={item} />;
          }}
        />
      ) : null}
      <View />
      <TouchableOpacity
        style={styles.soldBtn}
        onPress={() => {
          postearVenta({total, cliente, productCart, servicesCart});
          limpiarCampos();
        }}>
        <Text style={{color: '#f7f8f9', textTransform: 'uppercase'}}>
          Postear
        </Text>
      </TouchableOpacity>
      <OptionMenu open={menuOpen} closeMenu={() => toggleMenu(!menuOpen)} />
    </Animated.View>
  );
}

const ListItem = ({item, cantidad}) => {
  return (
    <View style={styles.cartItem}>
      <Text
        style={{
          fontSize: 12,
          textAlign: 'left',
          flex: 5,
          flexDirection: 'row',
        }}>
        {item.nombre}
        {` L${item.precioVenta}`}
      </Text>
      <TextInput
        style={styles.cartInput}
        keyboardType="numeric"
        defaultValue={'1'}
        onChangeText={(text) =>
          store.dispatch({
            type: 'SET_QUANTITY',
            object: item,
            quantity: text,
          })
        }
      />
      <Text style={{flex: 5, fontSize: 12, textAlign: 'center'}}>
        {`subtotal: L${Number.parseFloat(
          item.precioVenta * item.cantidad,
        ).toFixed(2)}`}
      </Text>
      <TouchableOpacity
        style={styles.removeFromCart}
        onPress={() => store.dispatch({type: 'REMOVE_FROM_CART', id: item.id})}>
        <Icon name="delete" style={styles.removeFromCart} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const OptionMenu = ({open, closeMenu}) => {
  return (
    <View style={styles.centeredView} onTouchEnd={() => closeMenu()}>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Cancelar venta',
                  'esto vaciara el carrito, presiona aceptar si estas de acuerdo',
                  [
                    {
                      text: 'Cancelar',
                    },
                    {
                      text: 'Aceptar',
                      onPress: () => {
                        closeMenu();
                        store.dispatch({
                          type: 'CLEAR_CART',
                        });
                      },
                    },
                  ],
                );
              }}
              style={styles.menuOptions}>
              <Icon
                name="remove-shopping-cart"
                style={styles.menuOptionsIcon}
              />
              <Text style={styles.menuOptionsText}>Cancelar Venta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                closeMenu();
              }}
              style={styles.menuOptions}>
              <Icon name="close" style={styles.menuOptionsIcon} color="red" />
              <Text style={[styles.menuOptionsText, {color: 'red'}]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
/**
 * Elementos descartados temporalmente
 * <View style={styles.menuOptions}>
              <Text>Por unidad/por mayoreo</Text>
              <Switch
                value={type}
                onChange={() => {
                  setVentaType(!type);
                  setType(!type);
                }}
              />
            </View>
 */

export default ShoppingCart;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    maxHeight: 500,
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
    backgroundColor: '#f2f3f4',
  },
  modalCloseMenu: {
    position: 'relative',
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  more: {
    borderRadius: 10,
    flex: 1,
    padding: 10,
    textAlign: 'right',
  },
  toggle: {
    flex: 9,
    borderRadius: 10,
    textAlign: 'left',
    padding: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1000,
  },
  toggleCart: {
    position: 'relative',
    padding: 5,
  },
  cartBody: {
    position: 'relative',
    width: '100%',
    height: 100,
  },
  cartHeader: {
    position: 'relative',
    flexDirection: 'row',
  },
  menuOptions: {
    flexDirection: 'row',
    paddingVertical: 16,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  menuOptionsIcon: {
    fontSize: 26,
    paddingHorizontal: 10,
  },
  menuOptionsText: {
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
  },
  soldBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101e5a',
    borderRadius: 20,
    padding: 20,
  },
  removeFromCart: {
    flex: 1,
    elevation: 5,
    color: '#cbc6c3',
  },
  total: {
    alignItems: 'flex-end',
  },
  cartItem: {
    width: '100%',
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartInput: {
    flex: 1,
    height: 30,
    textAlign: 'center',
    padding: 0,
    borderWidth: 1,
    borderColor: '#cbc6c3',
    color: 'black',
    borderRadius: 3,
    fontSize: 12,
  },
});
