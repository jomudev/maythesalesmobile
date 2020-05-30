import React, {useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../../../store';
import {TouchableHighlight} from 'react-native-gesture-handler';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartClient: {},
      cart: [],
      cantidades: [],
      total: 0,
      toggleIcon: 'expand-more',
      cartPosition: 0,
      cartHeight: 0,
      optionMenu: false,
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      const newCart = store.getState().cart;
      const newCantidades = store.getState().cantidades;
      const totalVenta = store.getState().totalVenta;
      const cliente = store.getState().cartClient;

      if (cliente !== this.state.cartClient) {
        this.setState({cartClient: cliente});
      }
      if (totalVenta !== this.state.total) {
        this.setState({total: totalVenta});
      }
      if (newCart !== this.state.cart) {
        this.setState({cart: newCart});
      }
      if (newCantidades !== this.state.cantidades) {
        this.setState({cantidades: newCantidades});
      }
    });
  }

  cantidad = data => {
    let cantidadToShow = 0;
    for (let i = 0; i < this.state.cantidades.length; i++) {
      if (data.pid === this.state.cantidades[i].pid) {
        cantidadToShow = this.state.cantidades[i].cantidad;
      }
    }

    return cantidadToShow;
  };

  toggleCart = () => {
    if (this.state.cartPosition === 0) {
      this.setState({
        cartPosition: this.state.cartHeight - this.state.cartHeight * 0.13,
        toggleIcon: 'expand-less',
      });
    } else {
      this.setState({
        cartPosition: 0,
        toggleIcon: 'expand-more',
      });
    }
  };

  render() {
    if (this.state.cart.length > 0) {
      return (
        <View
          style={[styles.container, {translateY: this.state.cartPosition}]}
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
              Carrito:{' '}
              <Text style={{textDecorationLine: 'underline'}}>
                {this.state.cartClient.nombre}
              </Text>
            </Text>
            {this.state.cart.map((data, index) => (
              <ListItem
                key={data + index}
                data={data}
                index={index}
                cantidad={this.cantidad.bind(this, data)}
              />
            ))}
            <View>
              <View style={styles.total}>
                <Text style={{fontSize: 18, marginRight: 20, marginTop: 20}}>
                  Total ponderado: {this.state.total}lps.
                </Text>
              </View>
              <TouchableHighlight style={styles.soldBtn}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Realizar venta
                </Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
          <OptionMenu
            open={this.state.optionMenu}
            closeMenu={() => this.setState({optionMenu: false})}
          />
        </View>
      );
    } else {
      return null;
    }
  }
}

const OptionMenu: () => React$Node = ({open, closeMenu}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ListItem = ({data, index, cantidad}) => (
  <View style={styles.cartItem}>
    <Text style={{fontSize: 18}}>{data.nombre}</Text>
    <Text style={styles.valorVenta}>{' Lps. ' + data.valorVenta}</Text>
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
    <Text>{' subTotal: Lps. ' + data.valorVenta * cantidad(data)}</Text>
    <TouchableOpacity
      style={styles.removeFromCart}
      onPress={() => store.dispatch({type: 'REMOVE_FROM_CART', index: index})}>
      <Text style={{color: 'red', fontSize: 18}}>Quitar</Text>
    </TouchableOpacity>
  </View>
);

export {ShoppingCart};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
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
    right: 0,
    top: 0,
    padding: 5,
  },
  modalView: {
    backgroundColor: 'rgb(243,243,243)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    minHeight: 100,
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
  toggleCart: {
    position: 'relative',
    padding: 5,
  },
  cartBody: {
    position: 'relative',
  },
  cartHeader: {
    position: 'relative',
  },
  valorVenta: {
    position: 'relative',
    fontSize: 18,
  },
  menuOptionBtn: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  soldBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: '#5d80b6',
    padding: 20,
  },
  removeFromCart: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  total: {
    alignItems: 'flex-end',
  },
  cartItem: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  cartInput: {
    width: 40,
    textAlign: 'center',
    height: 20,
    marginLeft: 5,
    padding: 0,
    borderWidth: 1,
    borderRadius: 3,
  },
});
