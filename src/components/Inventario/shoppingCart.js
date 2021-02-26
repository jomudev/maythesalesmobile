/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Animated,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../../../store';
import {moneyFormat, getTotal, verifyChanges, postSale} from '../mainFunctions';
import {
  removeProductFromCart,
  removeServicesFromCart,
  updateQuantity,
  clearStoreCart,
} from './functions';
import {ContextMenu} from '../auxComponents';

function ShoppingCart() {
  // saleState describe if the sale is sold out or not; true: sold out, false: pending;
  const [saleState, setSaleState] = useState(store.getState().defaultSaleState);

  const [productsCart, setProductsCart] = useState([]);
  const [servicesCart, setServicesCart] = useState([]);
  const [client, setClient] = useState(null);
  const [wholesaler, setWholesaler] = useState(null);
  const [totalProducts, setProductsTotal] = useState(0);
  const [totalServices, setServicesTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartHeight, setCartHeight] = useState(0);
  const cartPosition = useRef(new Animated.Value(+500)).current;
  const [isOpen, setIsOpen] = useState(false);
  const [toggleIcon, setToggleIcon] = useState('keyboard-arrow-down');
  let contextMenuRef = React.createRef();

  const showCart = () => {
    Animated.spring(cartPosition, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setIsOpen(true);
    setToggleIcon('keyboard-arrow-down');
  };

  const clearCart = (withAlert) => {
    if (withAlert) {
      Alert.alert(
        '¿Estás seguro?',
        'Esta acción eliminara todos los registros que has seleccionado para realizar una nueva venta.',
        [
          {
            text: 'No, Cancelar',
            onPress: () => {},
          },
          {
            text: 'Sí, estoy seguro',
            onPress: clearStoreCart,
          },
        ],
      );
    } else {
      clearStoreCart();
    }
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

  const verifyCart = (state) => {
    const cartHaveData =
      state.cartProducts.length > 0 || state.cartServices.length > 0;
    if (cartHaveData) {
      showCart();
    } else {
      hideCart(true);
    }
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      verifyChanges([
        {
          prevValue: productsCart,
          newValue: state.cartProducts,
          updateFunction: setProductsCart,
        },
        {
          prevValue: servicesCart,
          newValue: state.cartServices,
          updateFunction: setServicesCart,
        },
        {
          prevValue: client,
          newValue: state.cartClient,
          updateFunction: setClient,
        },
        {
          prevValue: wholesaler,
          newValue: state.cartWholesaler,
          updateFunction: setWholesaler,
        },
      ]);
      setSaleState(state.defaultSaleState);
      setTotal(
        getTotal(
          [state.cartProducts, state.cartServices],
          state.cartWholesaler,
        ),
      );
      setProductsTotal(getTotal([state.cartProducts], state.cartWholesaler));
      setServicesTotal(getTotal([state.cartServices], state.cartWholesaler));
      verifyCart(state);
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
          size={32}
          onPress={() => toggle()}
        />
        <View style={styles.saleState}>
          <Text style={{flex: 3, textAlign: 'right'}}>
            Estado de la venta:{' '}
          </Text>
          <Switch
            style={{flex: 1}}
            trackColor={{false: '#fff', true: '#fff'}}
            thumbColor={saleState ? '#434588' : '#b4b6be'}
            onValueChange={() => setSaleState(!saleState)}
            value={saleState}
          />
          <Text style={{flex: 2}}>{saleState ? 'Vendida' : 'Pendiente'}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => contextMenuRef.show()}>
          <Icon name="more-vert" size={32} style={styles.more} />
        </TouchableWithoutFeedback>
      </View>
      {wholesaler ? <Text>Mayorista: {wholesaler.nombre}</Text> : null}
      <View style={{flexDirection: 'row'}}>
        {client ? <Text>Cliente: {client.nombre}</Text> : null}
        <Text style={{flex: 1, textAlign: 'right', fontSize: 18}}>
          Total:{' '}
          {moneyFormat(getTotal([productsCart, servicesCart], wholesaler))}
        </Text>
      </View>
      <ScrollView style={styles.cartBody}>
        {productsCart.length > 0 ? (
          <ListHeader title={`Productos: ${moneyFormat(totalProducts)}`} />
        ) : null}
        {productsCart.length > 0
          ? productsCart
              .map((item) => (
                <ListItem
                  type="product"
                  remove={removeProductFromCart}
                  key={item.id}
                  item={item}
                  isWholesaler={wholesaler}
                />
              ))
              .reverse()
          : null}
        {servicesCart.length > 0 ? (
          <ListHeader title={`Servicios: ${moneyFormat(totalServices)}`} />
        ) : null}
        {servicesCart.length > 0
          ? servicesCart
              .map((item) => (
                <ListItem
                  type="service"
                  remove={removeServicesFromCart}
                  key={item.id}
                  item={item}
                  isWholesaler={wholesaler}
                />
              ))
              .reverse()
          : null}
      </ScrollView>
      <View />
      <TouchableOpacity
        style={styles.soldBtn}
        onPress={() => {
          postSale({
            total,
            client,
            wholesaler,
            productsCart,
            servicesCart,
            saleState,
          });
          clearCart();
        }}>
        <Text style={{color: '#f7f8f9', textTransform: 'uppercase'}}>
          Postear
        </Text>
      </TouchableOpacity>
      <ContextMenu
        ref={(target) => (contextMenuRef = target)}
        optionsList={[
          {
            iconName: 'cart-remove',
            text: 'Cancelar venta',
            onPress: () => clearCart(true),
          },
        ]}
        onTouchOutside={() => contextMenuRef.close()}
      />
    </Animated.View>
  );
}

const ListItem = ({item, isWholesaler, type, remove}) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <View style={styles.cartItem}>
      <Text
        style={{
          fontSize: 14,
          textAlign: 'left',
          flex: 5,
          flexDirection: 'row',
        }}>
        {item.nombre} {isWholesaler ? moneyFormat(item.precioMayoreo) : null}
      </Text>
      <TextInput
        style={styles.cartInput}
        keyboardType="numeric"
        defaultValue={'1'}
        onChangeText={(text) => setQuantity(Number(text))}
        onEndEditing={() =>
          quantity > 0
            ? updateQuantity(type.toUpperCase(), quantity, item.id)
            : null
        }
      />
      <Text style={{flex: 5, fontSize: 14, textAlign: 'right'}}>
        {moneyFormat(
          isWholesaler
            ? item.precioMayoreo * item.cantidad
            : item.precioVenta * item.cantidad,
        )}
      </Text>
      <TouchableOpacity
        style={styles.removeFromCart}
        onPress={() => remove(item.id)}>
        <Icon name="delete" style={styles.removeFromCart} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    maxHeight: '100%',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#e6e8f1',
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
    flex: 1,
    borderRadius: 10,
    textAlign: 'left',
    padding: 10,
  },
  saleState: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalView: {
    backgroundColor: 'white',
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
    maxHeight: 200,
  },
  cartHeader: {
    position: 'relative',
    flexDirection: 'row',
  },
  menuOptions: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  menuOptionsIcon: {
    fontSize: 16,
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#acbdd3',
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
    width: '100%',
    padding: 20,
  },
  removeFromCart: {
    flex: 1,
    elevation: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 14,
  },
});
