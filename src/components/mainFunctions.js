/**
 * This file contains the principal functions of the app
 */

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import store from '../../store';
import { ToastAndroid } from 'react-native';

const db = (collection) => {
  const authId = auth().currentUser.uid;
  const ref = firestore().collection('negocios');
  return collection ? ref.doc(authId).collection(collection) : ref.doc(authId);
};

async function initializeAppData(authUser) {
  try {
    const getDocData = (item) => item.doc.data();
    const getCollections = async (collection) =>
      (await db().collection(collection).get()).docChanges().map(getDocData);
    if (authUser) {
      await db().onSnapshot(async (snapshot) => {
        try {
          if (!snapshot) {
            return;
          }
          const newData = await snapshot.data();
          const clients = await getCollections('clientes');
          const products = await getCollections('productos');
          const services = await getCollections('servicios');
          const wholesalers = await getCollections('mayoristas');
          const data = {
            ...newData,
            clients,
            products,
            services,
            wholesalers,
          };
          store.dispatch({
            type: 'INITIALIZE_APP_DATA',
            data,
          });
        } catch (err) {
          console.warn('error trying to initialize app data ', err);
        }
      });
    }
  } catch (err) {
    console.warn('error trying to get inventory data', err);
  }
}

const getUserData = async () => {
  try {
    const currentUser = auth().currentUser;
    const userData = currentUser ? await db().get() : null;
    return {
      currentUser,
      userData: userData.data(),
    };
  } catch (err) {
    console.warn('error trying to get user data: ', err);
  }
};

const fileStorage = (path) => {
  const authId = auth().currentUser.uid;
  return storage().ref(`negocios/${authId}/${path}`);
};

const handleGetList = async (collectionKey) => {
  try {
    const collection = await db(collectionKey).get().then((snapQuery) => {
      return snapQuery.docChanges().map((change) => change.doc.data());
    });
    return collection;
  } catch (err) {
    console.warn('error trying to get data list: ', err);
  }
};

function moneyFormat(number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: store.getState().defaultCurrencyFormat || 'HNL',
  }).format(Number(number));
}

async function update(collectionKey, data) {
  try {
    return db(collectionKey).doc(data.id).update(data);
  } catch (err) {
    console.warn(
      'error trying to update the collection {',
      collectionKey,
      ' ',
      err,
    );
  }
}

async function deleteImage(imageType, docData) {
  try {
    const imageRef = `${imageType}/${docData.nombre}/productImage`;
    console.log(imageRef);
    return fileStorage(imageRef).delete()
  } catch (err) {
    console.warn('file storage alert: ', err);
  }
}

async function deleteFromInventory(collectionToDelete, docData) {
  try {
    if (collectionToDelete === 'productos' || collectionToDelete === 'services') {
      await deleteImage(collectionToDelete, docData).catch((err) => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
    }
    return await db()
      .collection(collectionToDelete)
      .doc(docData.id)
      .delete();
  } catch (err) {
    console.warn('error trying to delete from inventory ', err);
  }
}

const getSaleDate = (sale, type) => {
  return format(new Date(sale.timestamp.seconds * 1000), type, {
  locale: es,
})}

function sortCollection (collection) {
  let reports = {};
  collection.forEach((sale) => {
    let totalPurchased = 0;
    let totalProfits = 0;
    sale.productos.forEach((producto) => {
      totalPurchased += sale.estado ? producto.precioCosto * producto.cantidad : 0;
    });

    sale.servicios.forEach((servicio) => {
      totalPurchased += servicio.precioCosto * servicio.cantidad;
    });

    totalProfits = sale.total - totalPurchased;

    const year = getSaleDate(sale, 'yyyy');
    const month = getSaleDate(sale, 'MMMM');

    reports[year] = {
      ...reports[year],
      [month] : Array.from(reports[year] ? reports[year][month] ? reports[year][month] : [] : []).concat(sale),
    };
  });
  return reports;
}

function getTotal(list, isWholesaler) {
  try {
    let total = 0;
    list.forEach((collection) => {
      collection.forEach((element) => {
        total += isWholesaler
          ? element.precioMayoreo * element.cantidad
          : element.precioVenta * element.cantidad;
      });
    })
    return total;
  } catch (er) {
    console.log(er);
  }
}

function getProfits(list, isWholesaler) {
  try {
    let total = 0;
    let totalPurchased = 0;
    list.forEach((collection) => {
      total += getTotal([collection], isWholesaler);
      collection.forEach((element) => {
        totalPurchased += element.precioCosto * element.cantidad;
      });
    });
    return total - totalPurchased;
  } catch (err) {
    console.log(err);
  }
}

function getYearTotals(collection) {
  let total = 0;
  let profits = 0;

  Object.keys(collection).forEach((month) => {
    collection[month].filter(item => item.estado).forEach((sale) => {
      total += getTotal([sale.productos, sale.servicios], sale.mayorista);
      profits += getProfits([sale.productos, sale.servicios], sale.mayorista);
    });
  });

  return {
    total,
    profits,
  }
}

function getMonthTotals(collection) {
  let total = 0;
  let profits = 0;

  collection.forEach((sale) => {
    total += getTotal([sale.productos, sale.servicios], sale.mayorista);
    profits += getProfits([sale.productos, sale.servicios], sale.mayorista);
  });

  return {
    total,
    profits,
  }
}

async function share(content) {
  try {
    return await Share.open(content);
  } catch (err) {
    ToastAndroid.show('¡Ups! Ocurrio un problema, intenta nuevamente.');
  }
}

async function shareImage(url, content) {
  try {
    let imagePath = null;
    await RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', url)
      .then((resp) => {
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(async (base64Data) => {
        var base64Data = `data:image/jpeg;base64,${base64Data}`;
        await Share.open({...content, url: base64Data});
        RNFetchBlob.fs.unlink(imagePath);
      });
  } catch (err) {
    console.error(`Ocurrio un error al intentar compartir la imagen ${err}`);
    ToastAndroid.show('¡Ups! Ocurrio un problema, revisa tu conexión a internet.', ToastAndroid.LONG);
  }
}

function phoneFormat(phoneNumber) {
  phoneNumber.replace(/[-.]/i, '');
  return phoneNumber
    .split('')
    .map((digit, index) => (index === 3 ? `${digit}-` : digit))
    .join('');
}

function filterItems(item, search) {
  try {
    if (!search) {
      throw 'La busqueda no puede ser null o undefined';
    }
    search = search.toLowerCase().trim();
    item = JSON.stringify(item).toLowerCase()
    .replace(/(nombre)|(email)|(telefono)|(precioventa)|(descripcion)|(preciocosto)|(barcode)|(cantidad)| (id)|(imageURL)|(marca)|(preciomayoreo)/g, '');
    return (item.includes(search));
  } catch (err) {
    console.warn('error al intentar filtrar la coleccion de datos: ', err);
  }
}

const verifyChanges = (list) => {
  list.forEach((state) => {
    if (JSON.stringify(state.preValue) !== JSON.stringify(state.newValue)) {
      state.updateFunction(state.newValue);
    }
  });
};

const postSale = async ({
  products,
  services,
  total,
  client,
  wholesaler,
  saleState,
}) => {
  try {
    if (products.length < 1 && services.length < 1) {
      return;
    }

    products.forEach((item) => {
      firestore().runTransaction(async (t) => {
        const productRef = db('productos').doc(item.id);
        return await t.get(productRef).then((doc) => {
          let cantidad = doc.data().cantidad;
          let ventasPorProducto = doc.data().ventasPorProducto;
          ventasPorProducto = !ventasPorProducto ? 1 : ventasPorProducto + 1;
          cantidad -= item.cantidad;
          if (cantidad > 0) {
              return t.update(productRef, {
                cantidad,
                ventasPorProducto
              });
            }
        });
      });
    });
    const timestamp = Date.now();
    return await db('ventas')
      .doc(`${timestamp}`)
      .set({
        id: timestamp,
        estado: saleState,
        timestamp: new Date(),
        productos: products,
        servicios: services,
        total,
        cliente: client ? {nombre: client.nombre, id: client.id} : null,
        mayorista: wholesaler
          ? {nombre: wholesaler.nombre, id: wholesaler.id}
          : null,
      });
  } catch (err) {
    console.warn('error al intentar postear la venta ', err);
  }
};

export {
  initializeAppData,
  db,
  getUserData,
  deleteFromInventory,
  fileStorage,
  phoneFormat,
  filterItems,
  moneyFormat,
  update,
  sortCollection,
  shareImage,
  share,
  handleGetList,
  verifyChanges,
  postSale,
  deleteImage,
  getSaleDate,
  getTotal,
  getProfits,
  getYearTotals,
  getMonthTotals,
};
