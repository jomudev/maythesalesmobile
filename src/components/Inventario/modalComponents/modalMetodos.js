import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

let products = null;
let clients = null;
let services = null;
let providers = null;

const recolectarDatos = () => {
  let uid = auth().currentUser.uid;
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
const formatoTelefono = numero => {
  return numero
    .split('')
    .map((digito, index) => (index === 3 ? `${digito}-` : digito))
    .join('');
};

const save = (type, data, clean) => {
  recolectarDatos();
  if (data.nombre !== '' || data.cantidad ? !(data.cantidad < 0) : false) {
    type === 'product'
      ? products
          .doc(data.nombre)
          .set({
            id: randomId(0, 6),
            codigoDeBarras: data.codigoDeBarras,
            nombre: data.nombre,
            cantidad: Number(data.cantidad),
            proveedor: data.proveedor,
            costoPU: Number(data.costoPU),
            costoPM: Number(data.costoPM),
            precioPU: Number(data.precioPU),
            precioPM: Number(data.precioPM),
            descripcion: data.descripcion,
          })
          .then(() => {
            Alert.prompt('Registro guardado correcta')
          })
          .catch((err) => {
            console.log('error: ', err.code);
            Alert.alert('Error', 'Ocurrio un error intenta de nuevo');
          })
      : null;
    if (type === 'client') {
      const id = randomId(5, 3);
      clients
        .doc(id)
        .set({
          id,
          nombre: data.nombre,
          telefono: formatoTelefono(data.telefono),
          email: data.email,
          descripcion: data.descripcion,
        })
        .then(() => {
          clean();
        })
        .catch(err => {
          console.log('error: ', err.code);
          Alert.alert('Error', 'Ocurrio un error intenta de nuevo');
        });
    }
    if (type === 'service') {
      const id = randomId(4, 6);
      services
        .doc(id)
        .set({
          id,
          nombre: data.nombre,
          cantidad: Number(data.cantidad),
          proveedor: data.proveedor,
          costoPU: Number(data.costoPU),
          costoPM: Number(data.costoPM),
          precioPU: Number(data.precioPU),
          precioPM: Number(data.precioPM),
          descripcion: data.descripcion,
        })
        .then(() => {
          clean();
        })
        .catch(err => {
          console.log('error: ', err.code);
          Alert.alert('Error', 'Ocurrio un error intenta de nuevo');
        });
    }
    if (type === 'provider') {
      const id = randomId(5);
      providers
        .doc(id)
        .set({
          id,
          nombre: data.nombre,
          telefono: formatoTelefono(data.telefono),
          email: data.email,
          descripcion: data.descripcion,
        })
        .then(() => {
          clean();
        })
        .catch(err => {
          console.log('error: ', err.code);
          Alert.alert('Error', 'Ocurrio un error intenta de nuevo');
        });
    }
  } else {
    Alert.alert('Campos incompletos', 'Rellena los campos obligatorios');
  }
};

export {randomId, save};
