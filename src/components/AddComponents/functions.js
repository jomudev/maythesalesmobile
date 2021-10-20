import {db, getUserData, fileStorage} from '../mainFunctions';
import {ToastAndroid} from 'react-native';

const cleanString = (string) => {
  if (!string) {
    return '';
  }
  return string.match(/[0-9]/g).join('');
};

const getLetters = (length) => {
  let combination = '';
  for (let i = 0; i < length; i++) {
    combination += String.fromCharCode(
      Math.floor(Math.random() * (90 - 65) + 65),
    );
  }
  return combination;
};

const getNumbers = (length) => {
  let combination = '';
  for (let j = 0; j < length; j++) {
    combination += Math.floor(Math.random() * (10 - 0) + 0);
  }

  return combination;
};

const randomId = (lettersLength, numbersLength) => {
  return `${getLetters(lettersLength)}${getNumbers(numbersLength)}`;
};

const saveImage = async (productRef, data) => {
  productRef = productRef.child(`${data.nombre}/productImage`);
  await productRef.putFile(data.imageURL)
  .catch((err) => {
    ToastAndroid.show(`error: ${err}`, ToastAndroid.LONG);
  });
  return await productRef.getDownloadURL();
};

const saveProduct = (data, imageDownloadURL) => {
  try {
    const id = randomId(0, 6);
    data = {
      ...data,
      id,
      cantidad: Number(data.cantidad),
      precioCosto: Number(data.precioCosto),
      precioVenta: Number(data.precioVenta),
      precioMayoreo: Number(data.precioMayoreo),
      ventasPorProducto: 0,
      imageURL: imageDownloadURL,
    }
    return db('productos')
      .doc(id)
      .set(data);
  } catch (err) {
    console.log('error trying to save the product');
  }
};

const saveClient = (data) => {
  try {
    const id = randomId(5, 3);
    data = {
      ...data,
      id,
      telefono: cleanString(data.telefono),
    };
    return db('clientes')
      .doc(id)
      .set(data);
  } catch (err) {
    console.warn(`error trying to save the client on the inventory ${err}`);
  }
};

const saveService = (data, imageDownloadURL) => {
  try {
    const id = randomId(4, 6);
    return db('servicios')
      .doc(id)
      .set({
        nombre: data.nombre,
        id,
        marca: data.marca,
        barcode: data.barcode,
        cantidad: Number(data.cantidad),
        descripcion: data.descripcion,
        precioCosto: Number(data.precioCosto),
        precioVenta: Number(data.precioVenta),
        precioMayoreo: Number(data.precioMayoreo),
        imageURL: imageDownloadURL,
      });
  } catch (err) {
    console.warn(`error trying to save the service on the inventory ${err}`);
  }
};

const saveProvider = (data) => {
  try {
    const id = randomId(5, 2);
    return db('proveedores')
      .doc(id)
      .set({
        id,
        nombre: data.nombre,
        telefono: cleanString(data.telefono),
        email: data.email,
        descripcion: data.descripcion,
      });
  } catch (err) {
    console.warn(`error trying to save the provider on the inventory ${err}`);
  }
};

const saveWholesaler = (data) => {
  try {
    const id = randomId(5, 3);
    return db('mayoristas')
      .doc(id)
      .set({
        id,
        ...data,
        telefono: cleanString(data.telefono),
      });
  } catch (err) {
    console.warn(`error trying to save the wholesaler on the inventory ${err}`);
  }
};

const save = async (type, data) => {
  try {
    if (data.nombre !== '' && data.nombre !== null) {
      if (type === 'product') {
        if (data.image) {
          const imageDownloadURL = await saveImage(fileStorage('productos'), data);
          return saveProduct(data, imageDownloadURL);
        }
        return saveProduct(data);
      }
      if (type === 'service') {
        if (data.image) {
          const imageDownloadURL = await saveImage(fileStorage('servicios'), data);
          return saveService(data, imageDownloadURL);
        }
        return saveService(data);
      }
      if (type === 'client') {
        return saveClient(data);
      }
      if (type === 'provider') {
        return await saveProvider(data);
      }
      if (type === 'wholesaler') {
        return await saveWholesaler(data);
      }
    } else {
      throw 'error/invalid-name';
    }
  } catch (err) {
    console.log(
      'error al intentar guardar el registro en el inventario ' + err,
    );
  }
};

export {randomId, save};
