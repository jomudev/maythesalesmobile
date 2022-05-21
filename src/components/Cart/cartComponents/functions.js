import store from '../../../../store';

const removeProductFromCart = (id) => {
  let cartProducts = store.getState().cart.products;
  cartProducts = cartProducts.filter((product) => product.id !== id);
  store.dispatch({
    type: 'UPDATE_PRODUCTS',
    data: cartProducts,
  });
};

const removeServiceFromCart = (id) => {
  let cartServices = store.getState().cart.services;
  cartServices = cartServices.filter((service) => service.id !== id);
  store.dispatch({
    type: 'UPDATE_SERVICES',
    data: cartServices,
  });
};

const updateQuantity = (type, quantity, id) => {
  quantity = quantity > 0 ? quantity : 1;
  let cartProducts = store.getState().cart.products;
  let cartServices = store.getState().cart.services;
  if (type === 'PRODUCT') {
    cartProducts = cartProducts.map((product) =>
      product.id === id ? {...product, cantidad: quantity} : product,
    );
    store.dispatch({
      type: 'UPDATE_PRODUCTS',
      data: cartProducts,
    });
  } else if (type === 'SERVICE') {
    cartServices = cartServices.map((service) =>
      service.id === id ? {...service, cantidad: quantity} : service,
    );
    store.dispatch({
      type: 'UPDATE_SERVICES',
      data: cartServices,
    });
  }
};

const clearStoreCart = async () => {
  store.dispatch({
    type: 'CLEAR_CART',
  });
};

export {
  removeProductFromCart,
  removeServiceFromCart,
  updateQuantity,
  clearStoreCart,
};
