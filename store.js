import {createStore} from 'redux';
import {getTotal} from './src/components/mainFunctions';

const initialState = {
  title: 'Maythe´s Sales',
  products: [],
  clients: [],
  services: [],
  cart: [],
  servicesCart: [],
  cartClient: null,
  cartSeller: null,
  SellerPrice: 0,
  total: 0,
};

const calculateTotal = (products, services) =>
  Number(getTotal(products) + getTotal(services));

const values = (quantity, productOrService, list) => {
  list.map((product) =>
    product.id === productOrService.id
      ? (product.cantidad = isNaN(quantity) ? 1 : quantity)
      : product,
  );
  return list;
};

const reducers = (prevState, action) => {
  let newCart = prevState.cart;
  let newServicesCart = prevState.servicesCart;
  let newState = prevState;
  if (action.type === 'SET_TITLE') {
    newState = {
      ...prevState,
      title: action.newTitle,
    };
  }

  if (action.type === 'ADD_PRODUCT_TO_CART') {
    const product = action.product;
    product.precioVenta = Number(product.precioVenta);
    product.cantidad = 1;

    const existInCart =
      newCart.filter((search) => search.id === product.id).length > 0
        ? true
        : false;

    if (!existInCart) {
      newCart.push(product);
    }
    newState = {
      ...prevState,
      cart: newCart,
      total: calculateTotal(newCart, newServicesCart),
    };
  }
  if (action.type === 'ADD_SERVICE_TO_CART') {
    const service = action.service;
    service.precioVenta = Number(service.precioVenta);
    service.cantidad = 1;

    const existInCart =
      newServicesCart.filter((search) => search.id === service.id).length > 0
        ? true
        : false;

    if (!existInCart) {
      newServicesCart.push(service);
    }

    newState = {
      ...prevState,
      servicesCart: newServicesCart,
      total: calculateTotal(newCart, newServicesCart),
    };
  }
  if (action.type === 'SET_QUANTITY') {
    const object = action.object;
    action.quantity = !action.quantity ? 1 : Number(action.quantity);
    newCart = values(action.quantity, object, newCart);
    newServicesCart = values(action.quantity, object, newServicesCart);
    newState = {
      ...prevState,
      cart: newCart,
      total: calculateTotal(newCart, newServicesCart),
    };
  }
  if (action.type === 'CLEAR_CART') {
    newState = {
      ...prevState,
      cart: [],
      servicesCart: [],
      total: 0,
      cartClient: '',
    };
  }
  if (action.type === 'REMOVE_FROM_CART') {
    newCart = newCart.filter((item) => item.id !== action.id);
    newServicesCart = newServicesCart.filter((item) => item.id !== action.id);
    newState = {
      ...prevState,
      cart: newCart,
      servicesCart: newServicesCart,
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
      tipoVenta: action.data,
      total: calculateTotal(newCart, newServicesCart),
    };
  }
  if (action.type === 'SIGNOUT') {
    newState = initialState;
  }

  return newState;
};

export default createStore(reducers, initialState);
