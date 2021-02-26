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

async function initializeAppData() {
  try {
    const getData = (item) => item.doc.data();

    if (getUserData().currentUser) {
      db().onSnapshot(async (snapshot) => {
        try {
          if (!snapshot) {
            return;
          }
          const data = await snapshot.data();
          await store.dispatch({
            type: 'INITIALIZE_APP_DATA',
            data,
          });
        } catch (err) {
          console.warn('error trying to initialize app data ', err);
        }
      });

      const data = {
        ...(await db().get()).data(),
        clients: (await db().collection('clientes').get())
          .docChanges()
          .map(getData),
        products: (await db().collection('productos').get())
          .docChanges()
          .map(getData),
        services: (await db().collection('servicios').get())
          .docChanges()
          .map(getData),
        wholesalers: (await db().collection('mayoristas').get())
          .docChanges()
          .map(getData),
      };

      await store.dispatch({
        type: 'INITIALIZE_APP_DATA',
        data,
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

const handleGetList = (snap, list, setList) => {
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
    if (JSON.stringify(list) !== JSON.stringify(newList)) {
      setList(newList);
    }
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

async function getSales(snap, prevList) {
  if (!snap) {
    return;
  }
  var newList = prevList;
  try {
    const changes = snap.docChanges();
    for (let i = 0; i < changes.length; i++) {
      const change = changes[i];
      const data = change.doc.data();
      if (change.type === 'added') {
        const search = prevList.filter((item) => item.id === data.id);
        const isInList = search.length > 0;
        if (!isInList) {
          newList = newList.concat(data);
        }
      } else if (change.type === 'modified') {
        newList = prevList.map((item) =>
          JSON.stringify(item) === JSON.stringify(data) ? data : item,
        );
      } else if (change.type === 'removed') {
        newList = prevList.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(data),
        );
      }
    }
    return newList;
  } catch (err) {
    console.warn('error intentando obtener los registros de ventas ', err);
  }
}

//function that send a message and a true value to a snackbar hook
function handleSetSnackMessage(message, activeSnackbarHook, setMessageHook) {
  setMessageHook(message);
  activeSnackbarHook(true);
}

function getTotal(lists, isWholesaler) {
  let total = 0;
  lists.forEach((list) => {
    list.forEach((element) => {
      total += isWholesaler
        ? element.precioMayoreo * element.cantidad
        : element.precioVenta * element.cantidad;
    });
  });
  return total;
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
  productsCart,
  servicesCart,
  total,
  client,
  wholesaler,
  saleState,
}) => {
  try {
    if (productsCart.length < 1 && servicesCart.length < 1) {
      return;
    }

    productsCart.forEach((item) => {
      firestore().runTransaction(async (t) => {
        const productRef = db
          .collection('negocios')
          .doc(auth().currentUser.uid)
          .collection('productos')
          .doc(item.id);
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
    return await db('negocios')
      .doc(auth().currentUser.uid)
      .collection('ventas')
      .doc(`${timestamp}`)
      .set({
        id: timestamp,
        estado: saleState,
        timestamp: new Date(),
        productos: productsCart,
        servicios: servicesCart,
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
  getSales,
  handleSetSnackMessage,
  getTotal,
  shareImage,
  handleGetList,
  verifyChanges,
  postSale,
};
