import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
  SafeAreaView,
  Dimensions,
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

const deviceHeight = Dimensions.get('screen').height;

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
    var sortedCollection = {};

    if (collection || collection.length != 0) {
      const newList = collection.sort(sortCollectionItems);
      newList.forEach((item) => {
        const letter = item.nombre.split('')[0].toUpperCase()
        sortedCollection[letter] = sortedCollection[letter] ? sortedCollection[letter].concat(item) : [item]
      });
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
  var [collection, setCollection] = useState({});
  let [filteredCollection, setFilteredCollection] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const {collectionKey} = route.params;
  const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
      var searchSubscriber;
      const dataSubscriber = db(collectionKey).onSnapshot((snap) => {
        if (!snap) {
          return null;
        }
        handleGetList(collectionKey).then((collectionFromDB) => {
          const returnedCollection = sortCollection(collectionFromDB);
          setCollection(returnedCollection);
          setLoading(false);

          searchSubscriber = store.subscribe(() => {
            if (collectionFromDB) {
              return false;
            }
            handleSearch(
              collectionFromDB,
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
          setCollection(returnedCollection);
        });
        setLoading(false);
    })()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  function renderItem({item}) {
    return (
      <View key={JSON.stringify(item)}>
        <Text style={styles.listLetter}>{item.key}</Text>
          {item.data.map((item) => {
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

  const getItem = (data, index) => ({
    key: data[index],
    id: Math.random().toString(12).substring(0),
    data: Object.keys(filteredCollection).length ? filteredCollection[data[index]] : collection[data[index]]
  })

  return (
    <SafeAreaView style={{height: '100%'}}>
      <VirtualizedList
        data={
          Object.keys(filteredCollection).length ? 
          Object.keys(filteredCollection) :
          Object.keys(collection)
          }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.container}
        initialNumToRender={10}
        getItemCount={(data) => Object.keys(filteredCollection && collection).length}
        getItem={getItem}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            {EmptyListImages.default}
            <Text style={styles.emptyListText}>
              Agrega {collectionKey} para visualizarlos aquí...
            </Text>
          </View>
          )}
        onScroll={(event) =>
          scrollEvent(
            scrollPosition,
            event.nativeEvent.contentOffset.y,
            addButtonPosition,
            setScrollPosition,
          )}
        />
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() =>
          navigation.navigate(
            collectionKey[0].toUpperCase() + collectionKey.substring(1),
          )
        }>
        <Icon name="add" color="#FFF" size={28} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ShowInventory;
