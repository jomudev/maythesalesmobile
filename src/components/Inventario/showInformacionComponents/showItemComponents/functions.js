import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore().collection('negocios').doc(auth().currentUser.uid);
const productsCollection = db.collection('productos');

const update = async (collectionToUpdate, prevData, newData) => {
  try {
    if (collectionToUpdate === 'productos') {
      return productsCollection
        .doc(prevData.nombre.toUpperCase())
        .update(newData);
    } else {
      return db.collection(collectionToUpdate).doc(prevData.id).update(newData);
    }
  } catch (err) {
    console.log('try/catch error: ' + err);
  }
};

export {update};
