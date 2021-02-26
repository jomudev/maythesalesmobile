import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

var uid = null;
var storageRef = null;
var productRef = null;
var products = null;
var clients = null;
var services = null;
var providers = null;
var wholesaler = null;

if (auth().currentUser) {
  uid = auth().currentUser.uid;
  storageRef = storage().ref(`negocios/${uid}`);
  productRef = storageRef.child('productos');
}

const cleanString = (string) => {
  return string.match(/[0-9]/g).join('');
};

const collectData = () => {
  try {
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
      wholesaler = firestore()
        .collection('negocios')
        .doc(uid)
        .collection('mayoristas');
    }
  } catch (err) {
    console.warn('error al intentar obtener los datos del inventario', err);
  }
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

const saveProduct = async (data, imageDownloadURL) => {
  try {
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
      precioMayoreo: Number(data.precioMayoreo),
      imageURL: imageDownloadURL ? imageDownloadURL : null,
    });
  } catch (err) {
    console.log('error trying to save the product');
  }
};

const save = async (type, data) => {
  try {
    collectData();
    if (data.nombre !== '') {
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
          telefono: cleanString(data.telefono),
          email: data.email,
          descripcion: data.descripcion,
        });
      }
      if (type === 'service') {
        const id = randomId(4, 6);
        return services.doc(id).set({
          nombre: data.nombre,
          id,
          marca: data.marca,
          barcode: data.barcode,
          cantidad: Number(data.cantidad),
          descripcion: data.descripcion,
          precioCosto: Number(data.precioCosto),
          precioVenta: Number(data.precioVenta),
          precioMayoreo: Number(data.precioMayoreo),
        });
      }
      if (type === 'provider') {
        const id = randomId(5, 2);
        return providers.doc(id).set({
          id,
          nombre: data.nombre,
          telefono: cleanString(data.telefono),
          email: data.email,
          descripcion: data.descripcion,
        });
      }
      if (type === 'wholesaler') {
        const id = randomId(3, 3);
        return wholesaler.doc(id).set({
          id,
          nombre: data.nombre,
          telefono: cleanString(data.telefono),
          email: data.email,
          descripcion: data.descripcion,
        });
      }
    }
  } catch (err) {
    console.log(
      'error al intentar guardar el registro en el inventario ' + err,
    );
  }
};

export {randomId, save};
