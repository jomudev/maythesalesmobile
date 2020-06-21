import {createStore} from 'redux';
import { ActivityIndicator } from 'react-native-paper';

const reducers = (state, action) => {
  let newCart = state.cart;
  let newCantidades = state.cantidades;

  // Metodos
  const calcularSuma = (ventaType) => {
    let totalSuma = 0;
    for (let y = 0; y < newCart.length; y++) {
      for (let x = 0; x < newCantidades.length; x++) {
        if (ventaType) {
          if (newCantidades[x].pid === newCart[y].pid) {
            totalSuma += newCart[y].ventaP_M * newCantidades[x].cantidad;
          }
        } else {
          if (newCantidades[x].pid === newCart[y].pid) {
            totalSuma += newCart[y].ventaP_U * newCantidades[x].cantidad;
          }
        }
      }
    }
    return totalSuma;
  };

  const valores = (cantidad, product) => {
    for (let y = 0; y < newCantidades.length; y++) {
      if (newCantidades[y].pid === product.pid) {
        newCantidades[y].cantidad = cantidad;
      }
    }
  };

  // Fin de metodos.

  if (action.type === 'SET_TITLE') {
    return {
      ...state,
      title: action.newTitle,
    };
  }
  if (action.type === 'SET_INVENTORY') {
    return {
      ...state,
      products: action.products ? action.products : state.products,
      services: action.services ? action.services : state.services,
      clients: action.clients ? action.clients : state.clients,
      providers: action.providers ? action.providers : state.providers,
    };
  }
  if (action.type === 'ADD_PRODUCT_TO_CART') {
    const product = action.product;
    product.ventaP_U = parseInt(product.ventaP_U, 10);
    action.cantidad = parseInt(action.cantidad, 10);
    let productoEnCarrito = {existe: false, index: 0};
    for (let y = 0; y < newCart.length; y++) {
      // Recorremos el carrito para ver si el producto ya esta en el carrito.
      if (product.pid === newCart[y].pid) {
        // Establecemos si el producto existe en el carrito.
        productoEnCarrito = {existe: true, index: y};
      }
    }

    if (!productoEnCarrito.existe) {
      newCart = newCart.concat(product);
      newCantidades = newCantidades.concat({pid: product.pid, cantidad: 1});
    }
    return {
      ...state,
      cart: newCart,
      totalVenta: calcularSuma(),
      cantidades: newCantidades,
    };
  }
  if (action.type === 'SET_CANTIDAD') {
    const product = action.product;
    action.cantidad = parseInt(action.cantidad, 10);
    if (!action.cantidad) {
      action.cantidad = 1;
    }
    product.valorVenta = parseInt(product.valorVenta, 10);
    valores(action.cantidad, product);

    return {
      ...state,
      cantidades: newCantidades,
      cart: newCart,
      totalVenta: calcularSuma(),
    };
  }
  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      cart: [],
      cantidades: [],
      totalVenta: 0,
      cartClient: '',
    };
  }
  if (action.type === 'REMOVE_FROM_CART') {
    const index = action.index;
    newCart.splice(index, 1);
    newCantidades.splice(index, 1);
    return {
      ...state,
      cart: newCart,
      cantidades: newCantidades,
      totalventa: calcularSuma(),
    };
  }
  if (action.type === 'SET_CART_CLIENT') {
    return {
      ...state,
      cartClient: action.clientData,
    };
  }
  if (action.type === 'SET_VENTA_TYPE') {
    return {
      ...state,
      totalVenta: calcularSuma(action.ventaType),
    };
  }

  return state;
};

export default createStore(reducers, {
  ventaOpcion: '',
  products: [],
  clients: [],
  providers: [],
  services: [],
  title: 'Maythe´s Sales',
  cart: [],
  cartClient: '',
  cantidades: [],
  totalVenta: 0,
});
