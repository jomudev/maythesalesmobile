import {createStore} from 'redux';

const reducers = (state, action) => {
  let newCart = state.cart;
  if (action.type === 'SET_TITLE') {
    return {
      ...state,
      title: action.newTitle,
    };
  }
  if (action.type === 'ADD_PRODUCT_TO_CART') {
    const product = action.product;

    if (newCart.length > 0) {
      for (let x = 0; x < newCart.length; x++) {
        if (product.pid === newCart[x].pid) {
          return state;
        }
      }
    }

    newCart = newCart.concat(product);
    return {
      ...state,
      cart: newCart,
      cantidades: state.cantidades.concat({pid: product.pid, cantidad: 1}),
    };
  }
  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === 'REMOVE_FROM_CART') {
    const index = action.index;
    newCart.splice(index, 1);
    return {
      ...state,
      cart: newCart,
    }
  }

  return state;
};

export default createStore(reducers, {
  ventaOpcion: '',
  title: 'Maythe´s Sales',
  cart: [],
  cantidades: [],
});
