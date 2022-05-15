import firestore from '@react-native-firebase/firestore';

const db = (collection) => {
    const authId = auth().currentUser.uid;
    const ref = firestore().collection('negocios');
    return collection ? ref.doc(authId).collection(collection) : ref.doc(authId);
  };

async function initializeAppData(authUser) {
    try {
        const getDocData = (item) => item.doc.data();
        const getCollections = async (collection) =>
        (await db().collection(collection).get()).docChanges().map(getDocData);
        if (authUser) {
        await db().onSnapshot(async (snapshot) => {
            try {
            if (!snapshot) {
                return;
            }
            const newData = await snapshot.data();
            const clients = await getCollections('clientes');
            const products = await getCollections('productos');
            const services = await getCollections('servicios');
            const wholesalers = await getCollections('mayoristas');
            const data = {
                ...newData,
                clients,
                products,
                services,
                wholesalers,
            };
            store.dispatch({
                type: 'INITIALIZE_APP_DATA',
                data,
            });
            } catch (err) {
            console.warn('error trying to initialize app data ', err);
            }
        });
        }
    } catch (err) {
        console.warn('error trying to get inventory data', err);
    }
}

export {
    db,
    initializeAppData,
}