import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Animated,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItem from './listItem';
import {filterItems, handleGetList, db} from '../mainFunctions';
import store from '../../../store';
import EmptyListImages from '../emptyListImage';
import LoadingScreen from '../loadingScreen';

function scrollEvent(
  scrollPosition,
  value,
  addButtonPosition,
  setScrollPosition,
) {
  if (scrollPosition - value < -6) {
    Animated.timing(addButtonPosition, {
      toValue: 100,
      duration: 100,
      useNativeDriver: true,
    }).start();
    setScrollPosition(value);
  } else if (scrollPosition - value > 6) {
    Animated.timing(addButtonPosition, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    setScrollPosition(value);
  }
}

function sortCollectionItems(prev, next) {
  // prev = prevLetter, next = nextLetter
  prev = prev.nombre.split('')[0].toLowerCase();
  next = next.nombre.split('')[0].toLowerCase();
  if (prev > next) {
    return 1;
  } else if (prev < next) {
    return -1;
  } else {
    return 0;
  }
}

function sortCollection(collection) {
  try {
    var sortedCollection = {
      collection: [],
      alphabet: [],
    };

    if (collection || collection.length != 0) {
      const newList = collection.sort(sortCollectionItems);
      var alphabetToUse = new Set(
        newList.map((item) => item.nombre.split('')[0].toUpperCase()),
      );
      sortedCollection.collection = newList;
      sortedCollection.alphabet = Array.from(alphabetToUse);
    }
    return sortedCollection;
  } catch (err) {
    console.error('Error al ordenar la colección de datos', err);
  }
}

async function handleSearch(collection, search) {
  try {
    var filteredCollection = [];
    if (search && search.trim() !== '') {
      search = search.toLowerCase();
      filteredCollection = collection.filter((item) => filterItems(item, search));
    }
    return sortCollection(filteredCollection);
  } catch (err) {
    console.error('error trying to filter the data: ', err);
  }
}


function wait(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

function ShowInventory({navigation, route}) {
  var [inventory, setInventory] = useState({
    collection: [],
    alphabet: [],
  });
  let [filteredCollection, setFilteredCollection] = useState({
    collection: [],
    alphabet: [],
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const {collectionKey} = route.params;
  const [refreshing, setRefreshing] = useState(false);

    function renderByAlphabet(letter, collectionToRender){
      collectionToRender = collectionToRender.filter(
        (item) => item.nombre.split('')[0].toUpperCase() === letter,
      );
      return (
        <View key={letter}>
          <Text style={styles.listLetter}>{letter}</Text>
          {collectionToRender.map((item) => {
            return (
              <ListItem
                key={Math.random()}
                type={collectionKey}
                data={item}
                navigation={navigation}
              />
            );
          })}
        </View>
      );
    }

    function renderCollection(data) {
      const {collection, alphabet} = data;
      if (!collection.length) {
        return (
          <View style={styles.emptyListContainer}>
            {EmptyListImages.default}
            <Text style={styles.emptyListText}>
              Agrega {collectionKey} para visualizarlos aquí...
            </Text>
          </View>
        )
      }
      return alphabet.map((letter) => renderByAlphabet(letter, collection));
    }

    useEffect(() => {
      var searchSubscriber;
      const dataSubscriber = db(collectionKey).onSnapshot((snap) => {
        if (!snap) {
          return null;
        }
        handleGetList(collectionKey).then((collectionFromDB) => {
          const returnedCollection = sortCollection(collectionFromDB);
          setInventory(returnedCollection);
          setLoading(false);

          searchSubscriber = store.subscribe(() => {
            if (returnedCollection.collection.length < 1) {
              return false;
            }
            handleSearch(
              returnedCollection.collection,
              store.getState().search,
            ).then((returnedCollection) => {
              setFilteredCollection(returnedCollection);
            })
          });

        }).catch((err) => {
          console.error(`Error trying to get the ${collectionKey} from inventory: ${error}`);
        });
      });
  
      return () => {
        return (dataSubscriber(), searchSubscriber());
      };
    }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    (async () => {
        handleGetList(collectionKey).then((collectionFromDB) => {
          const returnedCollection = sortCollection(collectionFromDB);
          setInventory(returnedCollection);
        });
        setLoading(false);
    })()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        onScroll={(event) =>
          scrollEvent(
            scrollPosition,
            event.nativeEvent.contentOffset.y,
            addButtonPosition,
            setScrollPosition,
          )
        }>
        {
          filteredCollection.collection.length > 0 
          ? renderCollection(filteredCollection) 
          : renderCollection(inventory)
        }
      </ScrollView>
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() =>
          navigation.navigate(
            collectionKey[0].toUpperCase() + collectionKey.substring(1),
          )
        }>
        <Icon name="add" color="#FFF" size={28} />
      </TouchableOpacity>
    </>
  );
}

export default ShowInventory;
