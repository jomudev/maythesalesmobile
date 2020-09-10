/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
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
import moment from 'moment';

moment.locale('es');
const hoy = moment();
class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartClient: {},
      cart: [],
      cantidades: [],
      total: 0,
      toggleIcon: 'expand-more',
      open: true,
      cartPosition: new Animated.Value(0),
      cartHeight: 0,
      optionMenu: false,
      appear: new Animated.Value(0),
      ventasRef: null,
    };
    this.subscriber = this.subscriber.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.subscriber;
  }

  componentWillUnmount() {
    this.subscriber;
    store.dispatch({
      type: 'CLEAR_CART',
    });
  }

  subscriber = store.subscribe(() => {
    const newCart = store.getState().cart;
    const newCantidades = store.getState().cantidades;
    const totalVenta = store.getState().totalVenta;
    const cliente = store.getState().cartClient;
    const user = store.getState().user;
    this.setState({
      ventasRef: user
        ? firestore()
            .collection('users')
            .doc(user.uid)
            .collection('ventas')
        : null,
    });
    if (cliente !== this.state.cartClient) {
      this.setState({cartClient: cliente});
    }
    if (totalVenta !== this.state.totalVenta) {
      this.setState({total: totalVenta});
    }
    if (newCart !== this.state.newCart) {
      this.setState({cart: newCart});
    }
    if (newCantidades !== this.state.newCantidades) {
      this.setState({cantidades: newCantidades});
    }
  });

  componentDidUpdate() {
    if (!this.state.open) {
      Animated.timing(this.state.cartPosition, {
        toValue: this.state.cartHeight - this.state.cartHeight * 0.16,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }

  saveVenta = () => {
    const docId = () => {
      const id = moment().format('DDMMYYYYhhmmss');
      return id;
    };
    const ventasRef = this.state.ventasRef.doc(docId());
    const cart = this.state.cart;
    for (let x = 0; x < cart.length; x++) {
      if (cart[x].pid === this.state.cantidades[x].pid) {
        cart[x].cantidad = this.state.cantidades[x].cantidad;
      }
    }
    let venta = {
      lista: cart,
      cliente: {
        id: this.state.cartClient.id,
        nombre: this.state.cartClient.nombre,
      },
      total: this.state.total,
      fecha: hoy.format(),
    };
    console.log(venta);
    if (venta.lista.length < 1 || venta.total < 0) {
      return;
    }
    ventasRef
      .set(venta)
      .then(() => {
        store.dispatch({
          type: 'CLEAR_CART',
        });
      })
      .catch(err => {
        console.log(err.code);
        Alert(
          'Problemas de conexión',
          'Ha ocurrido un problema al tratar de realizar la transacción, intenta de nuevo',
          [
            {
              text: 'Ok',
              onPress: () => console.log('Ok pressed'),
            },
          ],
          {cancelable: false},
        );
      });
  };

  // Mostrar la cantidad respectiva de cada producto
  cantidad = data => {
    return this.state.cantidades.filter(c => data.id === c.id)[0].cantidad;
  };

  // Mostrar u ocultar el Carrito de compras
  toggleCart = () => {
    if (this.state.open) {
      Animated.timing(this.state.cartPosition, {
        toValue: this.state.cartHeight - this.state.cartHeight - 10,
        duration: 250,
        useNativeDriver: true,
      }).start();
      this.setState({
        open: false,
        toggleIcon: 'expand-less',
      });
    } else {
      Animated.timing(this.state.cartPosition, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
      this.setState({
        open: true,
        toggleIcon: 'expand-more',
      });
    }
  };

  appearAnimation = () => {
    if (this.state.cart.length > 0) {
      Animated.timing(this.state.appear, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(this.state.appear, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  render() {
    this.appearAnimation();
    return (
      <Animated.View
        style={[
          styles.container,
          {translateY: this.state.cartPosition, opacity: this.state.appear},
        ]}
        onLayout={Event =>
          this.setState({cartHeight: Event.nativeEvent.layout.height})
        }>
        <View style={styles.cartHeader}>
          <Icon
            name={this.state.toggleIcon}
            size={28}
            style={styles.toggleCart}
            onPress={() => this.toggleCart()}
          />
          <Icon
            name="more-horiz"
            size={28}
            style={styles.more}
            onPress={() => this.setState({optionMenu: true})}
          />
        </View>
        <ScrollView style={styles.cartBody}>
          <Text style={{fontSize: 24}}>
            {this.state.cartClient.nombre ? (
              <>
                Carrito:{' '}
                <Text style={{textDecorationLine: 'underline'}}>
                  {this.state.cartClient.nombre}
                </Text>
              </>
            ) : null}
          </Text>
          {this.state.cart.map((data, index) => (
            <ListItem
              key={data + index}
              data={data}
              index={index}
              cantidad={this.cantidad.bind(this, data)}
              ventaType={this.state.ventaType}
            />
          ))}
        </ScrollView>
        <View>
          <View style={styles.total}>
            <Text style={{fontSize: 18, marginRight: 20, marginTop: 20}}>
              Total ponderado: {Number.parseFloat(this.state.total).toFixed(2)}
              lps.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.soldBtn}
            onPress={() => this.saveVenta()}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Realizar venta
            </Text>
          </TouchableOpacity>
        </View>
        <OptionMenu
          open={this.state.optionMenu}
          closeMenu={() => this.setState({optionMenu: false})}
        />
      </Animated.View>
    );
  }
}

const OptionMenu = ({open, closeMenu}) => {
  return (
    <View style={styles.centeredView} onTouchEnd={() => closeMenu()}>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                closeMenu();
                store.dispatch({
                  type: 'CLEAR_CART',
                });
              }}
              style={styles.menuOptions}>
              <Icon
                name="remove-shopping-cart"
                style={styles.menuOptionsIcon}
              />
              <Text style={styles.menuOptionsText}>Vaciar Carrito</Text>
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

const ListItem = ({data, index, cantidad}) => {
  const [type, setType] = useState(false);
  useEffect(() => {
    let subscriber = () =>
      store.subscribe(() => {
        if (store.getState().ventaType !== type) {
          setType(store.getState().ventaType);
        }
      });

    return subscriber();
  }, []);
  return (
    <View style={styles.cartItem}>
      <Text
        style={{
          fontSize: 12,
          textAlign: 'center',
          width: '35%',
          flexDirection: 'row',
        }}>
        {data.nombre}
        {' L' +
          (type
            ? Number.parseFloat(data.ventaP_M).toFixed(2)
            : Number.parseFloat(data.ventaP_U).toFixed(2))}
      </Text>
      <TextInput
        style={styles.cartInput}
        keyboardType="numeric"
        defaultValue={cantidad(data).toString()}
        onChangeText={text =>
          store.dispatch({
            type: 'SET_CANTIDAD',
            product: data,
            cantidad: text,
          })
        }
      />
      <Text style={{width: '40%', fontSize: 12, textAlign: 'center'}}>
        {' subtotal: L' +
          (type
            ? Number.parseFloat(data.ventaP_M * cantidad(data)).toFixed(2)
            : Number.parseFloat(data.ventaP_U * cantidad(data)).toFixed(2))}
      </Text>
      <TouchableOpacity
        style={styles.removeFromCart}
        onPress={() =>
          store.dispatch({type: 'REMOVE_FROM_CART', index: index})
        }>
        <Icon name="delete" color="gray" size={24} />
      </TouchableOpacity>
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
    width: '90%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
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
    position: 'absolute',
    right: 10,
    top: 0,
    padding: 5,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    borderRadius: 10,
  },
  cartHeader: {
    position: 'relative',
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
    margin: 20,
    backgroundColor: '#101e5a',
    borderRadius: 10,
    padding: 20,
  },
  removeFromCart: {
    width: '10%',
    alignContent: 'center',
    alignItems: 'center',
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
    borderRadius: 3,
    fontSize: 12,
  },
});
