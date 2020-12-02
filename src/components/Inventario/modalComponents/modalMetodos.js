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

const recolectarDatos = () => {
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

const randomId = (letrasLength, numerosLength) => {
  // Crear una id con letras y digitos del 0 al 9

  let id = '';
  // Obtenemos las letras aleatorias y las añadimos al id
  for (let i = 0; i < letrasLength; i++) {
    id += String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
  }

  //obtenemos los numeros aleatorios y los añadimos a la id
  for (let j = 0; j < numerosLength; j++) {
    id += Math.floor(Math.random() * (10 - 0) + 0);
  }
  // retornamos el id
  return id;
};

//formatear numero de telefono
const formatoTelefono = (numero) => {
  return numero
    .split('')
    .map((digito, index) =>
      index === 3 ? (digito !== '- ' ? `${digito}-` : digito) : digito,
    )
    .join('');
};

const saveProduct = async (data, imageDownloadURL) => {
  return products.doc(data.nombre.toUpperCase()).set({
    nombre: data.nombre,
    id: randomId(0, 6),
    codigoDeBarras: data.codigoDeBarras,
    cantidad: Number(data.cantidad),
    descripcion: data.descripcion,
    precioCosto: Number(data.precioCosto),
    precioVenta: Number(data.precioVenta),
    proveedor: data.proveedor,
    imageURL: imageDownloadURL ? imageDownloadURL : null,
  });
};

const save = async (type, data, setSnackMessage) => {
  recolectarDatos();
  try {
    if (data.nombre !== '' || data.cantidad ? !(data.cantidad < 0) : false) {
      if (type === 'product') {
        return firestore().runTransaction(async (t) => {
          return await t
            .get(products.doc(data.nombre.toUpperCase()))
            .then((doc) => {
              if (!doc.exists) {
                var url = null;
                if (data.image) {
                  const uploadTask = productRef
                    .child(`${data.nombre}/mainImage`)
                    .putFile(data.image);
                  uploadTask.on('state_changed', (snap) => {
                    console.log(
                      (snap.bytesTransferred / snap.totalBytes) * 100,
                      '%',
                    );
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
              return 0;
            });
        });
      }
      if (type === 'client') {
        const id = randomId(5, 3);
        return clients.doc(id).set({
          id,
          nombre: data.nombre,
          telefono: formatoTelefono(data.telefono),
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
          telefono: formatoTelefono(data.telefono),
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
