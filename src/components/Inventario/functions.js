import store from '../../../cartStore';

const searchInCart = (element, data, callback) => {
  if (element.id === data.id) {
    callback(true);
    return data;
  } else {
    return element;
  }
};

const addProductToCart = (data) => {
  data.cantidad = 1;
  let cartProducts = store.getState().products || [];
  let isInCart = false;
  cartProducts = cartProducts.map((element) =>
    searchInCart(element, data, (res) => (isInCart = res)),
  );

  if (!isInCart) {
    cartProducts = cartProducts.concat(data);
  }

  store.dispatch({
    type: 'UPDATE_PRODUCTS',
    data: cartProducts,
  });
};

const addServiceToCart = (data) => {
  data.cantidad = 1;
  let cartServices = store.getState().services || [];
  let isInCart = false;
  cartServices = cartServices.map((element) =>
    searchInCart(element, data, (res) => (isInCart = res)),
  );

  if (!isInCart) {
    cartServices = cartServices.concat(data);
  }

  store.dispatch({
    type: 'UPDATE_SERVICES',
    data: cartServices,
  });
};

const addClientToCart = (data) => {
  if (data.id !== store.getState().client) {
    store.dispatch({
      type: 'SET_CLIENT',
      data,
    });
  }
};

const addWholesalerToCart = (data) => {
  if (data.id !== store.getState().client) {
    store.dispatch({
      type: 'SET_WHOLESALER',
      data,
    });
  }
};

const removeFromCart = (id) => {
  let products = store.getState().products;
  let services = store.getState().services;

  products = products.filter((element) => element.id !== id);
  services = services.filter((element) => element.id !== id);

  store.dispatch({
    type: 'UPDATE_CART_LISTS',
    products,
    services,
  });
} 

export {
  addProductToCart,
  addServiceToCart,
  addClientToCart,
  addWholesalerToCart,
  removeFromCart,
};
