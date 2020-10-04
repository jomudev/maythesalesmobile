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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../../../store';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';

async function postearVenta({productCart, servicesCart, total, cliente}) {
  try {
    const uid = await store.getState().user.uid;
    return await firestore()
      .collection('users')
      .doc(uid)
      .collection('ventas')
      .doc(moment().format('DDMMYYYYhhmmss'))
      .set({
        fecha: moment().format(),
        lista: productCart,
        servicios: servicesCart,
        total,
        cliente,
      });
  } catch (err) {
    console.log(err);
  }
}

function ShoppingCart() {
  const [productCart, setProductCart] = useState(store.getState().cart || []);
  const [servicesCart, setServicesCart] = useState(
    store.getState().servicesCart || [],
  );
  const [cliente, setCliente] = useState(null);
  const [total, setTotal] = useState(store.getState().totalVenta || 0);
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

  const hideCart = full => {
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
      if (state.totalVentas !== total) {
        setTotal(state.totalVenta);
      }
      if (state.cartCliente !== cliente) {
        setCliente(state.cartCliente);
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
      onLayout={Event => setCartHeight(Event.nativeEvent.layout.height)}
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
          name="more-horiz"
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
      <FlatList
        ListHeaderComponent={() => <ListHeader title="Lista de productos" />}
        style={styles.cartBody}
        data={productCart}
        renderItem={({item}) => {
          return <ListItem item={item} />;
        }}
      />
      <FlatList
        ListHeaderComponent={() => <ListHeader title="Lista de servicios" />}
        style={styles.cartBody}
        data={servicesCart}
        renderItem={({item}) => {
          return <ListItem item={item} />;
        }}
      />
      <View />
      <TouchableOpacity
        style={styles.soldBtn}
        onPress={() =>
          postearVenta({total, cliente, productCart, servicesCart})
            .then(() => limpiarCampos())
            .catch(err => {
              Alert.alert(
                'Error de conexión',
                'lo sentimos algo no ha salido bien, intenta de nuevo',
              );
              console.log(err);
            })
        }>
        <Text style={{color: '#f7f8f9', textTransform: 'uppercase'}}>
          Postear
        </Text>
      </TouchableOpacity>
      <OptionMenu open={menuOpen} closeMenu={() => toggleMenu(!menuOpen)} />
    </Animated.View>
  );
}

const ListItem = ({item, cantidad}) => {
  const [type, setType] = useState(false);
  useEffect(() => {
    let subscriber = () =>
      store.subscribe(() => {
        if (store.getState().ventaType !== type) {
          setType(store.getState().ventaType);
        }
      });

    return () => {
      subscriber;
    };
  }, []);
  return (
    <View style={styles.cartItem}>
      <Text
        style={{
          fontSize: 12,
          textAlign: 'left',
          width: '35%',
          flexDirection: 'row',
        }}>
        {item.nombre}
        {' L' +
          (type
            ? Number.parseFloat(item.ventaP_M).toFixed(2)
            : Number.parseFloat(item.ventaP_U).toFixed(2))}
      </Text>
      <TextInput
        style={styles.cartInput}
        keyboardType="numeric"
        defaultValue={'1'}
        onChangeText={text =>
          store.dispatch({
            type: 'SET_CANTIDAD',
            objeto: item,
            cantidad: text,
          })
        }
      />
      <Text style={{width: '40%', fontSize: 12, textAlign: 'center'}}>
        {' subtotal: L' +
          (type
            ? Number.parseFloat(item.ventaP_M * item.cantidad).toFixed(2)
            : Number.parseFloat(item.ventaP_U * item.cantidad).toFixed(2))}
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
    maxHeight: 400,
    bottom: 10,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 30,
    shadowColor: '#8d8b8b',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.2,
    shadowRadius: 60.0,
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
    backgroundColor: 'white',
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
    elevation: 5,
    padding: 20,
  },
  removeFromCart: {
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
  },
  cartInput: {
    width: '15%',
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
