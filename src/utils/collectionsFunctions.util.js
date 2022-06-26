import store from '../../store';
import Text from './textFunctions';

export default class CollectionsFunctions {
    static getCollectionList(collectionName) {
        var collection = store.getState().collections[collectionName];
        collection = this.sortCollection(collection);
        return collection;
    }

    static sortCollection (collection) {
        try {
            var sortedCollection = {};
            collection.forEach(item => {
                const key = Text.getUpperFirst(item.nombre);
                if (!sortedCollection[key]) {
                    sortedCollection[key] = [item];
                } else {
                    sortedCollection[key].push(item); 
                }
            });
            return sortedCollection;
        } catch (err) {
            console.error('Error al ordenar la colección de datos', err);
            return {};
        }
    }

    static sortCollectionItems(prev, next) {
        // prev = prevLetter, next = nextLetter
        if (prev > next) {
            return 1;
        } else if (prev < next) {
            return -1;
        } else {
            return 0;
        }
    }

    static async handleSearch(search) {
        try {
            var filteredCollection = [];
            if (search && search.trim() !== '') {
              search = search.toLowerCase();
              filteredCollection = store.getState().collection.filter((item) => {
                filterItems(store.getState().collection.find(element => item === element.id).nombre.split('')[0].toLogwerCase(), search)
              });
            }
            return filteredCollection;
        } catch (err) {
        console.error('error trying to filter the data: ', err);
        }
    }
}