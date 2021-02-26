import {createStore} from 'redux';

const initialState = {
  products: [],
  clients: [],
  services: [],
  wholesalers: [],
  // Configuration
  defaultSaleState: true,
  defaultCurrencyFormat: 'HNL',
  email: null,
  negocio: null,
  telefono: null,
};


const reducers = (prevState, action) => {
  let newState = prevState;
  
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
