import {createStore} from 'redux';
import {ProductData} from './src/components/Inventario/data';

const reducers = (state, action) => {
  let newCart = state.cart;
  let newCantidades = state.cantidades;

  // Metodos
  const calcularSuma = () => {
    let totalSuma = 0;
    for (let y = 0; y < newCart.length; y++) {
      for (let x = 0; x < newCantidades.length; x++) {
        if (newCantidades[x].pid === newCart[y].pid) {
          totalSuma += newCart[y].valorVentaP_U * newCantidades[x].cantidad;
        }
      }
    }
    return totalSuma;
  }

  const valores = (cantidad, product) => {
    for (let y = 0; y < newCantidades.length; y++) {
      if (newCantidades[y].pid === product.pid) {
        newCantidades[y].cantidad = cantidad;
      }
    }
  }

  // Fin de metodos.

  if (action.type === 'SET_TITLE') {
    return {
      ...state,
      title: action.newTitle,
    };
  }
  if (action.type === 'ADD_PRODUCT_TO_CART') {
    const product = action.product;
    product.valorVenta = parseInt(product.valorVentaP_U);
    action.cantidad = parseInt(action.cantidad);
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

    const suma = calcularSuma();
    return {
      ...state,
      cart: newCart,
      totalVenta: suma,
      cantidades: newCantidades,
    };
  }
  if (action.type === 'SET_CANTIDAD') {
    const product = action.product;
    action.cantidad = parseInt(action.cantidad);
    if (!action.cantidad) {
      action.cantidad = 1;
    }
    product.valorVenta = parseInt(product.valorVenta);
    valores(action.cantidad, product);

    const suma = calcularSuma();
    return {
      ...state,
      cantidades: newCantidades,
      cart: newCart,
      totalVenta: suma,
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
    const suma = calcularSuma();
    newCart.splice(index, 1);
    newCantidades.splice(index, 1);
    return {
      ...state,
      cart: newCart,
      cantidades: newCantidades,
      totalventa: suma,
    };
  }
  if (action.type === 'SET_CART_CLIENT') {
    return {
      ...state,
      cartClient: action.clientData,
    };
  }

  return state;
};

export default createStore(reducers, {
  ventaOpcion: '',
  productos: ProductData,
  title: 'Maythe´s Sales',
  cart: [],
  cartClient: '',
  cantidades: [],
  totalVenta: 0,
});
