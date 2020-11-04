import {createStore} from 'redux';

const initialState = {
  ventaOpcion: '',
  title: 'Maythe´s Sales',
  cart: [],
  servicesCart: [],
  cartClient: '',
  totalVenta: 0,
  tipoVenta: false,
};

const calcularSuma = (ventaType, CarritoDeProductos, CarritoDeServicios) => {
  let totalSuma = 0;
  if (CarritoDeProductos) {
    CarritoDeProductos.forEach(producto => {
      totalSuma += ventaType
        ? producto.precioPM * producto.cantidad
        : producto.precioPU * producto.cantidad;
    });
  }
  if (CarritoDeServicios) {
    CarritoDeServicios.forEach(servicio => {
      totalSuma += ventaType
        ? servicio.precioPM * servicio.cantidad
        : servicio.precioPU * servicio.cantidad;
    });
  }
  return Number(totalSuma);
};

const valores = (cantidad, productoOServicio, carritoProductos) => {
  carritoProductos.map(producto =>
    producto.id === productoOServicio.id
      ? (producto.cantidad = cantidad)
      : producto,
  );
  return carritoProductos;
};

const reducers = (prevState, action) => {
  let newCart = prevState.cart;
  let newServicesCart = prevState.servicesCart;
  let newState = prevState;
  if (action.type === 'SET_TITLE') {
    newState = {
      ...prevState,
      title: action.newTitle,
    };
  }
  if (action.type === 'SET_PRODUCTS') {
    newState = {
      ...prevState,
      products: action.products,
    };
  }
  if (action.type === 'SET_CLIENTS') {
    newState = {
      ...prevState,
      clients: action.clients,
    };
  }
  if (action.type === 'SET_PROVIDERS') {
    newState = {
      ...prevState,
      providers: action.providers,
    };
  }
  if (action.type === 'SET_SERVICES ') {
    newState = {
      ...prevState,
      services: action.services,
    };
  }
  if (action.type === 'SET_VENTAS') {
    newState = {
      ...prevState,
      ventas: action.ventas,
    };
  }
  if (action.type === 'ADD_PRODUCT_TO_CART') {
    const product = action.product;
    product.ventaP_U = Number(product.ventaP_U);
    product.cantidad = 1;

    const existeEnCarrito =
      newCart.filter(busqueda => busqueda.id === product.id).length > 0
        ? true
        : false;

    if (!existeEnCarrito) {
      newCart.push(product);
    }
    newState = {
      ...prevState,
      cart: newCart,
      totalVenta: calcularSuma(false, newCart, newServicesCart),
    };
  }
  if (action.type === 'ADD_SERVICE_TO_CART') {
    const service = action.service;
    service.ventaP_U = Number(service.ventaP_U);
    service.cantidad = 1;

    const existeEnCarrito =
      newServicesCart.filter(busqueda => busqueda.id === service.id).length > 0
        ? true
        : false;

    if (!existeEnCarrito) {
      newServicesCart.push(service);
    }

    newState = {
      ...prevState,
      servicesCart: newServicesCart,
      totalVenta: calcularSuma(false, newCart, newServicesCart),
    };
  }
  if (action.type === 'SET_CANTIDAD') {
    const objeto = action.objeto;
    action.cantidad = !action.cantidad ? 1 : Number(action.cantidad);
    newCart = valores(action.cantidad, objeto, newCart);
    newState = {
      ...prevState,
      cart: newCart,
      totalVenta: calcularSuma(false, newCart, newServicesCart),
    };
  }
  if (action.type === 'CLEAR_CART') {
    newState = {
      ...prevState,
      cart: [],
      servicesCart: [],
      totalVenta: 0,
      cartClient: '',
    };
  }
  if (action.type === 'REMOVE_FROM_CART') {
    newCart = newCart.filter(item => item.id !== action.id);
    newServicesCart = newServicesCart.filter(item => item.id !== action.id);

    const newSuma = calcularSuma(false, newCart, newServicesCart);
    newState = {
      ...prevState,
      cart: newCart,
      servicesCart: newServicesCart,
      totalVenta: newSuma,
    };
  }
  if (action.type === 'SET_CART_CLIENT') {
    newState = {
      ...prevState,
      cartClient: action.clientData,
    };
  }
  if (action.type === 'SET_VENTA_TYPE') {
    newState = {
      ...prevState,
      tipoVenta: action.data,
      totalVenta: calcularSuma(action.ventaType),
    };
  }
  if (action.type === 'SIGNOUT') {
    newState = initialState;
  }

  return newState;
};

export default createStore(reducers, initialState);
