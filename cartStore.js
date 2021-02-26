import {createStore} from 'redux';
import {getTotal} from './src/components/mainFunctions';
import store from './store';

const initialState = {
  products: [],
  services: [],
  client: null,
  wholesaler: null,
  defaultSaleState: store.getState().defaultSaleState,
};

const reducers = (prevState, action) => {
  let newState = prevState;
  let newProducts = prevState.products;
  let newServices = prevState.services;

  if (action.type === 'UPDATE_CART_LISTS') {
    newState = {
      ...prevState,
      products: action.products,
      services: action.services,
    }
  }

  if (action.type === 'UPDATE_PRODUCTS') {
    newState = {
      ...prevState,
      products: action.data,
    };
  }
  /** */
  if (action.type === 'UPDATE_SERVICES') {
    newState = {
      ...prevState,
      services: action.data,
    };
  }

  if (action.type === 'SET_CLIENT') {
    newState = {
      ...prevState,
      client: action.data,
    };
  }

  if (action.type === 'SET_WHOLESALER') {
    newState = {
      ...prevState,
      wholesaler: action.data,
    }
  }
  /** */
  if (action.type === 'SET_QUANTITY') {
    const element = action.element;
    action.quantity = !action.quantity ? 1 : Number(action.quantity);
    newProducts = values(action.quantity, element, prevState.products);
    newServices = values(action.quantity, element, prevState.services);
    newState = {
      ...prevState,
      products: newProducts,
      services: newServices,
      total: getTotal([newProducts, newServices], prevState.wholesaler),
    };
  }
  /** */
  if (action.type === 'REMOVE_PRODUCT') {
    newState = {
      ...prevState,
      products: action.data
    };
  }
  /** */
  if (action.type === 'CLEAR_CART') {
    newState = initialState;
  }

  return newState;
};

export default createStore(reducers, initialState);

// functions

const values = (quantity, element, list) => {
  list = list.map((listElement) => {
    if (listElement.id === element.id) {
      return {
        ...element,
        cantidad: quantity,
      }
    } else {
      return listElement;
    }
  });
  return list;
};
