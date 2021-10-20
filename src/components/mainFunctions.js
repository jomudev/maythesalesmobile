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

function orderReportsBy(type, collection) {
  let  newCollection = collection.map((item) => getSaleDate(item, type));
  newCollection = Array.from(new Set(newCollection));

  if (type === 'MMMM') {
    newCollection = newCollection.map((month) => {
      const filteredCollection = collection.filter((sale) => getSaleDate(sale, type) === month);
      let totalSold = filteredCollection.map((sale) => Number.parseInt(sale.total, 10));
      totalSold = totalSold.length > 0 ? totalSold.reduce((prevTotal, currentTotal) => prevTotal + currentTotal) : 0;

      const totalPurchase = filteredCollection.map((sale) => {
        let productsProfits = sale.productos.map((product) => 
        Number.parseInt(product.precioCosto) * Number.parseInt(product.cantidad));

        productsProfits = productsProfits.length > 0 ? productsProfits.reduce((prevProfits, currentProfits) => prevProfits + currentProfits) : 0;
        let servicesProfits = sale.servicios.map((service) => 
        Number.parseInt(service.precioCosto) * Number.parseInt(service.cantidad));
        servicesProfits = servicesProfits.length > 0 ? servicesProfits.reduce((prevProfits, currentProfits) => prevProfits + currentProfits) : 0;
        return productsProfits + servicesProfits;
      }).reduce((prevProfits, currentProfits) => prevProfits + currentProfits);

      const totalProfits = totalSold - totalPurchase;

      return {
        month,
        totalSold,
        totalProfits,
      }
    });
  } else if (type === 'YYYY') {
    newCollection = newCollection.map(year => {
      const filteredCollection = collection.filter((sale) => getSaleDate(sale, type) === year);
    })
  }
  return newCollection;
}

function getTotal(collection, isWholesaler) {
  try {
    let total = 0;
    collection.forEach((list) => {
      list.forEach((listElement) => {
        total += isWholesaler
          ? listElement.precioMayoreo * listElement.cantidad
          : listElement.precioVenta * listElement.cantidad;
      });
    });
    return total;
  } catch (er) {
    console.log(er);
  }
}

async function share(content) {
  console.log('sharing');
  return await Share.open(content);
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
    console.warn(`Ocurrio un error al intentar compartir la imagen ${err}`);
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
  orderReportsBy,
  getTotal,
  shareImage,
  share,
  handleGetList,
  verifyChanges,
  postSale,
  deleteImage,
  getSaleDate,
};
