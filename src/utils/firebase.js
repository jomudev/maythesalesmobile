import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export default class Firebase {

    
    static db(collection) {
        const authId = auth().currentUser.uid;
        const ref = firestore().collection('negocios');
        return collection ? ref.doc(authId).collection(collection) : ref.doc(authId);
    }

    static async initializeAppData(dispatch) {
        try {
            const getDocData = (item) => item.doc.data();
            const getCollections = async (collection) =>
            (await db().collection(collection).get()).docChanges().map(getDocData);
            if (auth().currentUser) {
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
                dispatch({
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

    static postSale(sale) {
        this.db('sales').doc(`${sale.id}`).set(sale.getJSON())
    }

    static async getUserData() {
        var data;
        await this.db().get().then((doc) => {
            data = {
                ...doc.data(),
                ...auth().currentUser,
            };
        });
        return data;
    }
}