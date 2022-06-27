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
            let keysArray = []
            collection.forEach(item => {
                keysArray.push(Text.getUpperFirst(item.nombre));
            });
            keysArray = Array.from(new Set(keysArray));
            keysArray = keysArray.sort(this.sortCollectionItems);
            
            var arrayToReturn = keysArray.map((key) => [key, ...this.getCollectionPerLetter(key, collection)]);
            return arrayToReturn.flat();
        } catch (err) {
            console.error('Error al ordenar la colección de datos', err);
            return {};
        }
    }

    static getCollectionPerLetter(letter, collection) {
        return collection.filter(element => Text.getUpperFirst(element.nombre) === letter);
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
                filterItems(store.getState().collection.find(element => item === element.id).nombre.split('')[0].toLowerCase(), search)
              });
            }
            return filteredCollection;
        } catch (err) {
        console.error('error trying to filter the data: ', err);
        }
    }
}