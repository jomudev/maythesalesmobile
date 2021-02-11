import {createStore} from 'redux';

const initialState = {
  products: [],
  clients: [],
  services: [],
  wholesalers: [],
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

  return newState;
};

export default createStore(reducers, initialState);
