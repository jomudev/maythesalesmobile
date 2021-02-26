import {createStore} from 'redux';
import {getTotal} from './src/components/mainFunctions';

const initialState = {
  // Usual
  search: '',
  // Collections
  products: [],
  clients: [],
  services: [],
  wholesalers: [],
  // Cart
  cartProducts: [],
  cartServices: [],
  cartClient: null,
  cartWholesaler: null,
  // Configuration
  defaultSaleState: true,
  defaultCurrencyFormat: 'HNL',
  email: null,
  negocio: null,
  telefono: null,
};

const reducers = (prevState, action) => {
  let newState = prevState;

  if (action.type === 'SET_SEARCH') {
    newState = {
      ...prevState,
      search: action.text,
    }
  }

  if (action.type === 'UPDATE_CART_LISTS') {
    newState = {
      ...prevState,
      cartProducts: action.cartProducts,
      cartServices: action.cartServices,
    }
  }

  if (action.type === 'UPDATE_PRODUCTS') {

    newState = {
      ...prevState,
      cartProducts: action.data,
    };
  }
  /** */
  if (action.type === 'UPDATE_SERVICES') {
    newState = {
      ...prevState,
      cartServices: action.data,
    };
  }

  if (action.type === 'SET_CLIENT') {
    newState = {
      ...prevState,
      cartClient: action.data,
    };
  }

  if (action.type === 'SET_WHOLESALER') {
    newState = {
      ...prevState,
      cartWholesaler: action.data,
    }
  }

  /** */
  if (action.type === 'CLEAR_CART') {
    newState = {
      ...prevState,
      cartProducts: [],
      cartServices: [],
      cartClient: null,
      cartWholesaler: null,
    };
  }

  /** */
  if (action.type === 'SIGN_OUT') {
    newState = initialState;
  }
  if (action.type === 'SET_PRODUCTS') {
    newState = {
      ...prevState,
      products: action.data,
    }
  }
  if (action.type === 'SET_CLIENTS') {
    newState = {
      ...prevState,
      clients: action.data,
    }
  }
  if (action.type === 'SET_SERVICES') {
    newState = {
      ...prevState,
      services: action.data,
    }
  }
  if (action.type === 'SET_WHOLESALERS'){
    newState = {
      ...prevState,
      wholesalers: action.data,
    }
  }

  if (action.type === 'SET_DEFAULT_SALE_STATE') {
    newState = {
      ...prevState,
      defaultSaleState: action.data,
    }
  }

  if (action.type === 'SET_DEFAULT_CURRENCY_FORMAT') {
    newState = {
      ...prevState,
      defaultCurrencyFormat: action.data,
    }
  }

  if (action.type === 'INITIALIZE_APP_DATA') {
    newState = {
      ...prevState,
      ...action.data,
    }
  }

  return newState;
};

export default createStore(reducers, initialState);
