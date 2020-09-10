import {createStore} from 'redux';

const initialState = {
  ventaOpcion: '',
  user: undefined,
  userData: undefined,
  isNewUser: false,
  newUserData: null,
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
};

// Metodos
const calcularSuma = (ventaType, newCantidades, newCart) => {
  let totalSuma = 0;
  newCart.forEach((producto, index) => {
    ventaType
      ? (totalSuma += newCantidades[index].cantidad * producto.ventaP_M)
      : (totalSuma += newCantidades[index].cantidad * producto.ventaP_U);
  });
  return Number(totalSuma);
};

const valores = (cantidad, product, newCantidades) => {
  newCantidades.map((c, i) => {
    c.id === product.id ? (newCantidades[i].cantidad = cantidad) : null;
  });
};

const reducers = (prevState, action) => {
  let newCart = prevState.cart;
  let newCantidades = prevState.cantidades;
  let newState = prevState;

  if (action.type === 'SET_IS_NEW_USER') {
    newState = {
      ...prevState,
      isNewUser: action.data,
      newUserData: action.newUserData,
    };
  }
  if (action.type === 'SET_USER') {
    newState = {
      ...prevState,
      userData: action.userData,
      user: action.user,
    };
  }
  if (action.type === 'SET_TITLE') {
    newState = {
      ...prevState,
      title: action.newTitle,
    };
  }
  if (action.type === 'SET_PRODUCTS') {
    newState = {
      ...prevState,
      products: action.products,
    };
  }
  if (action.type === 'SET_CLIENTS') {
    newState = {
      ...prevState,
      clients: action.clients,
    };
  }
  if (action.type === 'SET_PROVIDERS') {
    newState = {
      ...prevState,
      providers: action.providers,
    };
  }
  if (action.type === 'SET_SERVICES ') {
    newState = {
      ...prevState,
      services: action.services,
    };
  }
  if (action.type === 'SET_VENTAS') {
    newState = {
      ...prevState,
      ventas: action.ventas,
    };
  }
  if (action.type === 'ADD_PRODUCT_TO_CART') {
    const product = action.product;
    product.ventaP_U = Number(product.ventaP_U);
    action.cantidad = Number(action.cantidad);

    const existeEnCarrito =
      newCart.filter(busqueda => busqueda.id === product.id).length > 0
        ? true
        : false;

    existeEnCarrito
      ? null
      : (newCart = newCart.concat(product)) &&
        (newCantidades = newCantidades.concat({id: product.id, cantidad: 1}));

    newState = {
      ...prevState,
      cart: newCart,
      totalVenta: calcularSuma(false, newCantidades, newCart),
      cantidades: newCantidades,
    };
  }
  if (action.type === 'SET_CANTIDAD') {
    const product = action.product;
    action.cantidad = Number(action.cantidad);
    !action.cantidad ? (action.cantidad = 1) : null;
    product.valorVenta = Number(product.ventaP_U);
    valores(action.cantidad, product, newCantidades);

    newState = {
      ...prevState,
      cantidades: newCantidades,
      cart: newCart,
      totalVenta: calcularSuma(false, newCantidades, newCart),
    };
  }
  if (action.type === 'CLEAR_CART') {
    newState = {
      ...prevState,
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
    newState = {
      ...prevState,
      cart: newCart,
      cantidades: newCantidades,
      totalventa: calcularSuma(false, newCantidades, newCart),
    };
  }
  if (action.type === 'SET_CART_CLIENT') {
    newState = {
      ...prevState,
      cartClient: action.clientData,
    };
  }
  if (action.type === 'SET_VENTA_TYPE') {
    newState = {
      ...prevState,
      totalVenta: calcularSuma(action.ventaType),
    };
  }

  return newState;
};

export default createStore(reducers, initialState);
