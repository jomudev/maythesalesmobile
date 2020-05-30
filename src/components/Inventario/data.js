const Ventas = [
  {
    venta: [
      {
        cantidad: 1,
        ganancia: 15,
        nombre: 'baymax',
        pid: '2344',
        refId: '5wPgPs3vaoHCdCCMfCZ9',
        uid: 'm19nhLJ0rzeRbm6BgoluY8oLsAT2',
        valorInvertido: 40,
        valorVenta: 55,
      },
      {
        cantidad: 1,
        ganancia: 15,
        nombre: 'baymax',
        pid: '2344',
        refId: '5wPgPs3vaoHCdCCMfCZ9',
        uid: 'm19nhLJ0rzeRbm6BgoluY8oLsAT2',
        valorInvertido: 40,
        valorVenta: 55,
      },
      {
        cantidad: 1,
        ganancia: 15,
        nombre: 'baymax',
        pid: '2344',
        refId: '5wPgPs3vaoHCdCCMfCZ9',
        uid: 'm19nhLJ0rzeRbm6BgoluY8oLsAT2',
        valorInvertido: 40,
        valorVenta: 55,
      },
    ],
    venta1: [
      {
        cantidad: 1,
        ganancia: 15,
        nombre: 'baymax',
        pid: '2344',
        refId: '5wPgPs3vaoHCdCCMfCZ9',
        uid: 'm19nhLJ0rzeRbm6BgoluY8oLsAT2',
        valorInvertido: 40,
        valorVenta: 55,
      },
      {
        cantidad: 1,
        ganancia: 15,
        nombre: 'baymax',
        pid: '2344',
        refId: '5wPgPs3vaoHCdCCMfCZ9',
        uid: 'm19nhLJ0rzeRbm6BgoluY8oLsAT2',
        valorInvertido: 40,
        valorVenta: 55,
      },
      {
        cantidad: 1,
        ganancia: 15,
        nombre: 'baymax',
        pid: '2344',
        refId: '5wPgPs3vaoHCdCCMfCZ9',
        uid: 'm19nhLJ0rzeRbm6BgoluY8oLsAT2',
        valorInvertido: 40,
        valorVenta: 55,
      },
    ],
  },
];

const ClientsData = [
  {
    id: 'asdjfqiuy4a3',
    nombre: 'John Doe',
    telefono: '',
    email: 'johndoe@gmail.com',
    comentario: '',
  },
  {
    id: 'faq2qwrq34',
    nombre: 'Carl Doe',
    telefono: '3234-2435',
    email: 'carldoe@gmail.com',
    comentario: '',
  },
];

const ProvidersData = [
  {
    id: 'asdjfqiuy4a3',
    nombre: 'Grupo intur',
    telefono: '2440-8960',
    email: 'grupointur@gmail.com',
    comentario: 'Mayorista',
  },
  {
    id: 'faq2qwrq34',
    nombre: 'Carlos Carias',
    telefono: '3456-2435',
    email: 'calocar@gmail.com',
    comentario: 'Vendedor de panes ambulante',
  },
  {
    id: 'faq2qwrq34',
    nombre: 'Carlos Carias',
    telefono: '3456-2435',
    email: 'calocar@gmail.com',
    comentario: 'Vendedor de verduras',
  },
];

const ProductData = [
  {
    cantidad: 20,
    nombre: 'Baymax',
    pid: '0386',
    refId: '3omxdK59wUAdmaOFPQZc',
    uid: 'QSdEwPeAUXTyaOrQefMIeOMu9j72',
    valorInvertido: 15,
    valorVenta: 30,
    masa: false,
    ganancia: 15,
  },
  {
    cantidad: 20,
    nombre: 'Sandia',
    pid: '1234',
    refId: '3omxdK59wUAdmaOFPQZc',
    uid: 'QSdEwPeAUXTyaOrQefMIeOMu9j72',
    valorInvertido: 15,
    valorVenta: 30,
    masa: true,
    ganancia: 15,
  },
  {
    cantidad: 0,
    ganancia: 60,
    nombre: 'Escandalosos',
    pid: '0440',
    refId: 'CDixpRjasuom4Xw41HnR',
    uid: 'm19nhLJ0rzeRbm6BgoluY8oLsAT2',
    valorInvertido: 120,
    valorVenta: 180,
    masa: false,
  },
];

const ServicesData = [
  {
    cantidad: 20,
    nombre: 'Baymax',
    pid: '0386',
    refId: '3omxdK59wUAdmaOFPQZc',
    uid: 'QSdEwPeAUXTyaOrQefMIeOMu9j72',
    valorInvertido: 15,
    valorVenta: 30,
    masa: false,
    ganancia: 15,
  },
  {
    cantidad: 20,
    nombre: 'Sandia',
    pid: '1234',
    refId: '3omxdK59wUAdmaOFPQZc',
    uid: 'QSdEwPeAUXTyaOrQefMIeOMu9j72',
    valorInvertido: 15,
    valorVenta: 30,
    masa: true,
    ganancia: 15,
  },
  {
    cantidad: 0,
    ganancia: 60,
    nombre: 'Escandalosos',
    pid: '0440',
    refId: 'CDixpRjasuom4Xw41HnR',
    uid: 'm19nhLJ0rzeRbm6BgoluY8oLsAT2',
    valorInvertido: 120,
    valorVenta: 180,
    masa: false,
  },
];

const FormOptions = [
  {
    name: 'Agregar cliente',
    icon: 'favorite',
    funcType: 'ADD_CLIENT',
    type: 'Clientes',
  },
  {
    name: 'Agregar producto',
    icon: 'shopping-basket',
    funcType: 'ADD_PRODUCT',
    type: 'Productos',
  },
  {
    name: 'Agregar Servicio',
    icon: 'loyalty',
    funcType: 'ADD_SERVICE',
    type: 'Servicios Adicionales',
  },
  {
    name: 'Agregar Proveedor',
    icon: 'assignment-ind',
    funcType: 'ADD_PROVIDER',
    type: 'Proveedores',
  },
];

const Badge = 'Lps.';

export {
  ProductData,
  Ventas,
  FormOptions,
  Badge,
  ClientsData,
  ProvidersData,
  ServicesData,
};
