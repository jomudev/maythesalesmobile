import {createStore} from 'redux';

const reducers = (state, action) => {
  let newCart = state.cart;
  let newCantidades = state.cantidades;

  // Metodos
  const calcularSuma = ventaType => {
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
    return Number.parseFloat(totalSuma).toFixed(2);
  };

  const valores = (cantidad, product) => {
    for (let y = 0; y < newCantidades.length; y++) {
      if (newCantidades[y].pid === product.pid) {
        newCantidades[y].cantidad = cantidad;
      }
    }
  };

  // Fin de metodos.
  if (action.type === 'SET_IS_NEW_USER') {
    return {
      ...state,
      isNewUser: action.data,
    };
  }
  if (action.type === 'SET_USER_DATA') {
    return {
      ...state,
      userData: action.data,
      user: action.user,
    };
  }
  if (action.type === 'SET_TITLE') {
    return {
      ...state,
      title: action.newTitle,
    };
  }
  if (action.type === 'SET_PRODUCTS') {
    let newList = state.products.filter(p => {
      return action.products.map(actionP => actionP.id.includes(p.id));
    });

    newList = newList.length > 0 ? newList : action.products;

    return {
      ...state,
      products: newList,
    };
  }
  if (action.type === 'SET_CLIENTS') {
    let newList = state.clients.filter(c => {
      return action.clients.map(actionC => actionC.id.includes(c.id));
    });

    newList = newList.length > 0 ? newList : action.clients;

    return {
      ...state,
      clients: newList,
    };
  }
  if (action.type === 'SET_PROVIDERS') {
    return {
      ...state,
      providers: action.providers,
    };
  }
  if (action.type === 'SET_SERVICES ') {
    return {
      ...state,
      services: action.services,
    };
  }
  if (action.type === 'ADD_PRODUCT_TO_CART') {
    const product = action.product;
    product.ventaP_U = Number(product.ventaP_U);
    action.cantidad = Number(action.cantidad);
    let productoEnCarrito = false;
    if (newCart.length > 0) {
      for (let y = 0; y < newCart.length; y++) {
        // Recorremos el carrito para ver si el producto ya esta en el carrito.
        if (product.pid === newCart[y].pid) {
          // Establecemos si el producto existe en el carrito.
          productoEnCarrito = true;
        } else {
          productoEnCarrito = false;
        }
      }
    }

    if (!productoEnCarrito) {
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
    action.cantidad = Number(action.cantidad);
    if (!action.cantidad) {
      action.cantidad = 1;
    }
    product.valorVenta = Number.parseFloat(product.valorVenta).toFixed(2);
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
  user: null,
  userData: null,
  isNewUser: false,
  products: [],
  clients: [],
  providers: [],
  ventas: [],
  services: [],
  title: 'Maythe´s Sales',
  cart: [],
  cartClient: '',
  cantidades: [],
  totalVenta: 0,
});
