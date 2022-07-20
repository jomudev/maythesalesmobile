import {createStore} from 'redux';

const initialState = {
  // Usual
  search: '',
  // Collections
  collections: {
    ventas: [],
    productos: [],
    clientes: [],
    servicios: [],
    proveedores: [],
  },
  // Reports
  reports: null,
  // Cart
  cart: {
    productos: [],
    servicios: [],
    cliente: null,
  },
  // Configuration
  data: {
    defaultSaleState: true,
    defaultCurrencyFormat: 'HNL',
    email: null,
    negocio: null,
    telefono: null,
    isNewUser: null,
  },
};

const reducers = (prevState, action) => {
  let newState = prevState;

  if (action.type === 'SET_COLLECTIONS') {
    newState.collections = action.data;
  }

  if (action.type  === 'SET_REPORTS') {
    newState.reports = action.data;
  }

  if (action.type === 'SET_SEARCH') {
    newState = {
      ...prevState,
      search: action.text,
    }
  }

  if (action.type === 'SET_CART') {
    newState.cart = action.cart;
  }

  if (action.type === 'UPDATE_PRODUCTS') {

    newState.cart.products = action.data;
  }
  /** */
  if (action.type === 'UPDATE_SERVICES') {
    newState.cart.services = action.data;
  }

  if (action.type === 'SET_CART_CLIENT') {
    newState.cart.client = action.data;
  }

  /** */
  if (action.type === 'CLEAR_CART') {
    newState.cart = {
      cartProducts: [],
      cartServices: [],
      cartClient: null,
    };
  }

  if (action.type === 'SIGN_OUT') {
    newState = initialState;
  }

  if (action.type === 'SET_DEFAULT_SALE_STATE') {
    newState = {
      ...prevState,
      defaultSaleState: action.data,
    }
  }

  if (action.type === 'SET_DEFAULT_CURRENCY_FORMAT') {
    newState.data.defaultCurrencyFormat = action.data;
  }

  if (action.type === 'SET_DATA') {
    newState.data = action.data
  }

  return newState;
};

export default createStore(reducers, initialState);
