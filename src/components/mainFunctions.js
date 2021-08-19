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

const handleGetList = async (snap, list) => {
  try {
    if (!snap) {
      return;
    }
    let newList = list;
    snap.docChanges().forEach((change) => {
      const data = change.doc.data();
      switch (change.type) {
        case 'added':
          const isInList = list.filter((item) => item.id === data.id)[0];
          if (!isInList) {
            newList = newList.concat(data);
          }
          break;
        case 'modified':
          newList = list.map((item) => (item.id === data.id ? data : item));
          break;
        case 'removed':
          newList = list.filter((item) => item.id !== data.id);
          break;
        default:
          break;
      }
    });
    return {
      newList,
      isItIdentical: JSON.stringify(list) === JSON.stringify(newList),
    };
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

async function update(collectionToUpdate, data) {
  try {
    return db().collection(collectionToUpdate).doc(data.id).update(data);
  } catch (err) {
    console.warn(
      'error trying to update the collection {',
      collectionToUpdate,
      ' ',
      err,
    );
  }
}

async function deleteFromInventory(collectionToDelete, docToDeleteKey) {
  try {
    return await db()
      .collection(collectionToDelete)
      .doc(docToDeleteKey)
      .delete();
  } catch (err) {
    console.warn('error trying to delete from inventory ', err);
  }
}

function getPeriodsReports(list) {
  let newList = list.map((item) => {
    return format(new Date(item.timestamp.seconds * 1000), 'yyyy MMMM', {
      locale: es,
    });
  });

  newList = new Set(newList);
  newList = [...newList].map((item) => {
    let total = 0;
    list.forEach((venta) => {
      const date = format(
        new Date(venta.timestamp.seconds * 1000),
        'yyyy MMMM',
        {
          locale: es,
        },
      );
      if (item === date) {
        total += venta.estado ? venta.total : 0;
      }
    });
    return {
      period: item,
      total,
    };
  });

  return newList;
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

async function shareImage(url, options) {
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
        await Share.open({...options, url: base64Data});
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
  search = search.toLowerCase();
  return (
    // if one of this fields concord with the search, then return true
    (item.nombre ? item.nombre.toLowerCase().includes(search) : false) ||
    (item.descripcion
      ? item.descripcion.toLowerCase().includes(search)
      : false) ||
    (item.email ? item.email.toLowerCase().includes(search) : false) ||
    (item.marca ? item.marca.toLowerCase().includes(search) : false) ||
    (item.telefono ? item.telefono.includes(search) : false) ||
    (item.precioVenta ? item.precioVenta.toString().includes(search) : false) ||
    (item.precioMayoreo
      ? item.precioMayoreo.toString().includes(search)
      : false) ||
    (item.precioCosto ? item.precioCosto.toString().includes(search) : false) ||
    (item.barcode ? item.barcode.includes(search) : false) ||
    (item.cantidad ? item.cantidad.toString().includes(search) : false)
  );
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
          if (cantidad > 0) {
            cantidad -= item.cantidad;
            if (cantidad > 0) {
              return t.update(productRef, {
                cantidad,
              });
            }
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
  getPeriodsReports,
  getTotal,
  shareImage,
  handleGetList,
  verifyChanges,
  postSale,
};
