import store from '../../../store';

const addProductToCart = (data) => {
  data.cantidad = 1;
  let cartProducts = store.getState().cart.products || [];
  let isInCart = cartProducts.filter(
    (cartProduct) => cartProduct.id === data.id,
  );

  if (isInCart.length === 0) {
    cartProducts = cartProducts.concat(data);
    store.dispatch({
      type: 'UPDATE_PRODUCTS',
      data: cartProducts,
    });
  }
};

const addServiceToCart = (data) => {
  data.cantidad = 1;
  let cartServices = store.getState().cart.services || [];
  let isInCart = cartServices.filter(
    (cartService) => cartService.id === data.id,
  );

  if (isInCart.length === 0) {
    cartServices = cartServices.concat(data);
    store.dispatch({
      type: 'UPDATE_SERVICES',
      data: cartServices,
    });
  }
};

const addClientToCart = (data) => {
  const cartClient = store.getState().cart.client;
  if (cartClient) {
    if (data) {
      if (data.id !== cartClient.id) {
        store.dispatch({
          type: 'SET_CLIENT',
          data,
        });
        return;
      }
    }
  }
  store.dispatch({
    type: 'SET_CLIENT',
    data,
  });
};

const removeProductFromCart = (id) => {
  console.log(id);
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

const clearStoreCart = () => {
  store.dispatch({
    type: 'CLEAR_CART',
  });
};

export {
  addProductToCart,
  addServiceToCart,
  addClientToCart,
  removeProductFromCart,
  removeServiceFromCart,
  updateQuantity,
  clearStoreCart,
};
