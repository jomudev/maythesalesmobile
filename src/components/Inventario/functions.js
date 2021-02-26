import store from '../../../store';

const addProductToCart = (data) => {
  data.cantidad = 1;
  let cartProducts = store.getState().cartProducts || [];
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
  let cartServices = store.getState().cartServices || [];
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
  if (data.id !== store.getState().cartClient) {
    store.dispatch({
      type: 'SET_CLIENT',
      data,
    });
  }
};

const addWholesalerToCart = (data) => {
  if (data.id !== store.getState().cartClient) {
    store.dispatch({
      type: 'SET_WHOLESALER',
      data,
    });
  }
};

const removeProductFromCart = (id) => {
  console.log(id);
  let cartProducts = store.getState().cartProducts;
  cartProducts = cartProducts.filter((product) => product.id !== id);
  store.dispatch({
    type: 'UPDATE_PRODUCTS',
    data: cartProducts,
  });
};

const removeServiceFromCart = (id) => {
  let cartServices = store.getState().cartServices;
  cartServices = cartServices.filter((service) => service.id !== id);
  store.dispatch({
    type: 'UPDATE_SERVICES',
    data: cartServices,
  });
};

const updateQuantity = (type, quantity, id) => {
  quantity = quantity > 0 ? quantity : 1;
  let cartProducts = store.getState().cartProducts;
  let cartServices = store.getState().cartServices;
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
  addWholesalerToCart,
  removeProductFromCart,
  removeServiceFromCart,
  updateQuantity,
  clearStoreCart,
};
