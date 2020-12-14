import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

async function update(collectionToUpdate, data) {
  const db = firestore().collection('negocios').doc(auth().currentUser.uid);
  try {
    return db.collection(collectionToUpdate).doc(data.id).update(data);
  } catch (err) {
    console.log(err);
  }
}

export {update};
