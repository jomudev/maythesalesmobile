import {createStore} from 'redux';
import { createRef } from 'react';
import Sale from './src/components/Sale';

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
  cart: createRef().current = new Sale(),
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
