import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import store from '../../../../store';

let products = null;
let clients = null;
let services = null;
let providers = null;

const recolectarDatos = () => {
  let uid = store.getState().user.uid;
  if (uid !== null) {
    products = firestore()
      .collection('users')
      .doc(uid)
      .collection('productos');
    clients = firestore()
      .collection('users')
      .doc(uid)
      .collection('clientes');
    services = firestore()
      .collection('users')
      .doc(uid)
      .collection('servicios');
    providers = firestore()
      .collection('users')
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

const save = (type, data, clean) => {
  recolectarDatos();
  if (data.nombre !== '' || data.cantidad ? !(data.cantidad < 0) : false) {
    type === 'product'
      ? products
          .doc(data.nombre)
          .set({
            id: randomId(0, 6),
            nombre: data.nombre,
            cantidad: Number(data.cantidad),
            proveedor: data.proveedor,
            costoP_U: Number(data.costoP_U),
            costoP_M: Number(data.costoP_M),
            ventaP_U: Number(data.ventaP_U),
            ventaP_M: Number(data.ventaP_M),
            descripcion: data.descripcion,
          })
          .then(() => {
            clean;
          })
          .catch(err => {
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
          telefono: data.telefono,
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
          costoP_U: Number(data.costoP_U),
          costoP_M: Number(data.costoP_M),
          ventaP_U: Number(data.ventaP_U),
          ventaP_M: Number(data.ventaP_M),
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
          telefono: data.telefono,
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
