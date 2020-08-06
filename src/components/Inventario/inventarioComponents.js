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
  Switch,
  Animated,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../../../store';
import firestore from '@react-native-firebase/firestore';

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
    };
    this.ventasRef = null;
    this.subscriber = this.subscriber.bind(this);
  }

  componentDidMount() {
    this.ventaRef = firestore()
      .collection('users')
      .doc(store.getState().user.uid)
      .collection('ventas');
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

  fechaFormat = format => {
    const date = new Date();
    const fechaCorta = `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
    let dia,
      mes,
      anio = null;

    dia = date.getDate();
    anio = date.getFullYear();

    switch (date.getMonth() + 1) {
      case 1:
        mes = 'enero';
        break;
      case 2:
        mes = 'febrero';
        break;
      case 3:
        mes = 'marzo';
        break;
      case 4:
        mes = 'abril';
        break;
      case 5:
        mes = 'mayo';
        break;
      case 6:
        mes = 'junio';
        break;
      case 7:
        mes = 'julio';
        break;
      case 8:
        mes = 'agosto';
        break;
      case 9:
        mes = 'septiembre';
        break;
      case 10:
        mes = 'octubre';
        break;
      case 11:
        mes = 'noviembre';
        break;
      case 12:
        mes = 'diciembre';
        break;
    }

    const fechaLarga = `${dia} de ${mes} del ${anio}`;

    if (format === 'short') {
      return fechaCorta;
    }
    if (format === 'long') {
      return fechaLarga;
    }
  };

  saveVenta = () => {
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
      fecha: this.fechaFormat('short'),
      fechaLarga: this.fechaFormat('long'),
    };

    if (venta.lista.length < 1 || venta.total < 0) {
      return;
    }
    this.ventasRef
      .add(venta)
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
    let cantidadToShow = 0;
    for (let i = 0; i < this.state.cantidades.length; i++) {
      if (data.pid === this.state.cantidades[i].pid) {
        cantidadToShow = this.state.cantidades[i].cantidad;
      }
    }

    return cantidadToShow;
  };

  // Mostrar u ocultar el Carrito de compras
  toggleCart = () => {
    if (this.state.open) {
      Animated.timing(this.state.cartPosition, {
        toValue: this.state.cartHeight - this.state.cartHeight * 0.2,
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

  render() {
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
              Total ponderado: {this.state.total}lps.
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

const OptionMenu: () => React$Node = ({open, closeMenu}) => {
  const [type, setType] = useState(store.getState().ventaType);
  const setVentaType = ventaType => {
    store.dispatch({
      type: 'SET_VENTA_TYPE',
      ventaType,
    });
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View
            style={{
              ...styles.modalView,
              alignContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Icon
              name="expand-more"
              size={28}
              style={styles.modalCloseMenu}
              onPress={() => closeMenu()}
            />
            <View style={styles.menuOptions}>
              <TouchableOpacity
                onPress={() => {
                  closeMenu();
                  store.dispatch({
                    type: 'CLEAR_CART',
                  });
                }}
                style={styles.menuOptionBtn}>
                <Icon name="remove-shopping-cart" size={24} />
                <Text>Vaciar Carrito</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuOptions}>
              <Text>Por unidad/por mayoreo</Text>
              <Switch
                value={type}
                onChange={() => {
                  setVentaType(!type);
                  setType(!type);
                }}
              />
            </View>
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
      <Text style={{textAlign: 'left', width: '35%', flexDirection: 'row'}}>
        <Text>{data.nombre}</Text>
        {' Lps. ' +
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
      <Text style={{width: '40%', textAlign: 'right'}}>
        {' subTotal: Lps. ' +
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

export {ShoppingCart};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    maxHeight: 400,
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  modalCloseMenu: {
    position: 'relative',
    top: 0,
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
    backgroundColor: 'rgb(243,243,243)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    minHeight: 200,
    alignItems: 'center',
  },
  toggleCart: {
    position: 'relative',
    padding: 5,
  },
  cartBody: {
    position: 'relative',
    width: '100%',
  },
  cartHeader: {
    position: 'relative',
  },
  menuOptionBtn: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  menuOptions: {
    flexDirection: 'row',
    padding: 20,
    width: '100%',
  },
  soldBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#101e5a',
    borderRadius: 4,
    padding: 20,
  },
  removeFromCart: {
    width: '10%',
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
