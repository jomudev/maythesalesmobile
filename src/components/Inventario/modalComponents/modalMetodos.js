import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';

var uid = null;
var storageRef = null;
var productRef = null;

if (auth().currentUser) {
  uid = auth().currentUser.uid;
  storageRef = storage().ref(`negocios/${uid}`);
  productRef = storageRef.child('productos');
}

let products = null;
let clients = null;
let services = null;
let providers = null;

const collectData = () => {
  if (uid !== null) {
    products = firestore()
      .collection('negocios')
      .doc(uid)
      .collection('productos');
    clients = firestore()
      .collection('negocios')
      .doc(uid)
      .collection('clientes');
    services = firestore()
      .collection('negocios')
      .doc(uid)
      .collection('servicios');
    providers = firestore()
      .collection('negocios')
      .doc(uid)
      .collection('proveedores');
  }
};

const getLetters =  (length) => {
  let combination = '';
  for (let i = 0; i < length; i++) {
    combination += String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
  };
  return combination;
}

const getNumbers = (length) => {
  let combination = '';
  for (let j = 0; j < length; j++) {
    combination += Math.floor(Math.random() * (10 - 0) + 0);
  };

  return combination;
}

const randomId = (lettersLength, numbersLength) => {
  return `${getLetters(lettersLength)}${getNumbers(numbersLength)}`;
};

const phoneFormat = (number) => {
  return number
    .split('')
    .map((digit, index) =>
      index === 3 ? (digit !== '-' ? `${digit}-` : digit) : digit,
    )
    .join('');
};

const saveProduct = async (data, imageDownloadURL) => {
  const id = randomId(0, 6);
  return products.doc(id).set({
    nombre: data.nombre,
    id,
    marca: data.marca,
    barcode: data.barcode,
    cantidad: Number(data.cantidad),
    descripcion: data.descripcion,
    precioCosto: Number(data.precioCosto),
    precioVenta: Number(data.precioVenta),
    proveedor: data.proveedor,
    imageURL: imageDownloadURL ? imageDownloadURL : null,
  });
};

const save = async (type, data, setSnackMessage) => {
  collectData();
  try {
    if (data.nombre !== '' || data.cantidad ? !(data.cantidad < 0) : false) {
      if (type === 'product') {
        var url = null;
        if (data.image) {
          const uploadTask = productRef
            .child(`${data.nombre}/mainImage`)
            .putFile(data.image);
          uploadTask.on('state_changed', (snap) => {
            console.log((snap.bytesTransferred / snap.totalBytes) * 100, '%');
          });

          uploadTask.then(async () => {
            url = await productRef
              .child(`${data.nombre}/mainImage`)
              .getDownloadURL();
            return saveProduct(data, url);
          });
          return;
        }
        return saveProduct(data);
      }
      if (type === 'client') {
        const id = randomId(5, 3);
        return clients.doc(id).set({
          id,
          nombre: data.nombre,
          telefono: phoneFormat(data.telefono),
          email: data.email,
          descripcion: data.descripcion,
        });
      }
      if (type === 'service') {
        return services.doc(data.nombre.toUpperCase()).set({
          id: randomId(4, 6),
          nombre: data.nombre,
          cantidad: Number(data.cantidad),
          proveedor: data.proveedor,
          marca: data.marca,
          costoPU: Number(data.costoPU),
          costoPM: Number(data.costoPM),
          precioPU: Number(data.precioPU),
          precioPM: Number(data.precioPM),
          descripcion: data.descripcion,
        });
      }
      if (type === 'provider') {
        const id = randomId(5, 2);
        return providers.doc(id).set({
          id,
          nombre: data.nombre,
          telefono: phoneFormat(data.telefono),
          email: data.email,
          descripcion: data.descripcion,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export {randomId, save};
