import firestore from '@react-native-firebase/firestore';
import store from '../../../../store';
const user = store.getState().user;

async function updateClient(data) {
  try {
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('clientes');
  } catch (e) {
    console.log(e, 'updateClient error');
  }
}
