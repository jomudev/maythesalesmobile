import React, {useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  InputText,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../../../store';

const ShoppingCart: () => React$Node = () => {
  const [cart, setCart] = useState([]);
  const [cantidades, setCantidades] = useState([]);
  const [total, setTotal] = useState(0);

  store.subscribe(() => {
    let newCart = store.getState().cart;
    let newCantidades = store.getState().cantidades;
    let totalSuma = 0;

    if (newCart) {
      setCart(newCart);
      for (let x = 0; x < newCart.length; x++) {
        totalSuma += newCart[x].valorVenta;
      }
      setTotal(totalSuma);
    }
    if (newCantidades) {
      setCantidades(newCantidades);
    }
  });

  const cantidad = data => {
    let cantidadToShow = 0;
    for (let i = 0; i < cantidades.length; i++) {
      if (data.pid === cantidades[i].pid) {
        cantidadToShow = cantidades[i].cantidad;
      }
    }

    return cantidadToShow;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{fontSize: 24, textAlign: 'center'}}>Carrito</Text>
      {cart.map((data, index) => (
        <View key={data + index} style={styles.cartItem}>
          <Text style={{fontSize: 18}}>{cantidad(data)} </Text>
          <Text style={{fontSize: 18}}>{data.nombre}</Text>
          <Text style={styles.valorVenta}>
            {' ' + data.valorVenta + 'lps.'}
          </Text>
          <TouchableOpacity
            style={styles.removeFromCart}
            onPress={() =>
              store.dispatch({type: 'REMOVE_FROM_CART', index: index})
            }>
            <Text style={{color: 'red', fontSize: 18}}>Quitar</Text>
          </TouchableOpacity>
        </View>
      ))}
      {cart.length > 0 ? (
        <View>
          <View style={styles.total}>
            <Text style={{fontSize: 18, marginRight: 20, marginTop: 20}}>Total ponderado: {total}lps.</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              store.dispatch({
                type: 'CLEAR_CART',
              })
            }
            style={styles.clearCart}>
            <Icon name="remove-shopping-cart" size={24} />
            <Text>Vaciar Carrito</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
};

export {ShoppingCart};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  valorVenta: {
    position: 'relative',
    fontSize: 18,
  },
  clearCart: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  removeFromCart: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  total: {
    alignItems: 'flex-end',
  },
  cartItem: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
  },
});
