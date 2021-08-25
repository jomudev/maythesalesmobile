import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, ScrollView, View, Animated} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItem from './listItem';
import EmptyListImage from '../emptyListImage';
import {
  moneyFormat,
  phoneFormat,
  filterItems,
  handleGetList,
  db,
} from '../mainFunctions';
import store from '../../../store';
import EmptyListImages from '../emptyListImage';
import LoadingScreen from '../loadingScreen';

function scrollEvent (
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
};

function sortCollectionItems (prev, next) {
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

function sortCollection (collection) {
  try {
    var sortedCollection = {
      collection: [],
      alphabet: [],
    };
    if (collection || collection.length != 0) { 
      const newList = collection.sort(sortCollectionItems);
      var alphabetToUse = new Set(newList.map((item) => item.nombre.split('')[0].toUpperCase()));
      sortedCollection.collection = newList;
      sortedCollection.alphabet = Array.from(alphabetToUse);
    }
    return sortedCollection;
  } catch (err) {
    console.error('Error al ordenar la colección de datos', err);
  }
};

async function handleSearch (search, collectionKey) {
  try {
    var collectionToReturn;
    await db(collectionKey).get().then((snap) => {
      collectionToReturn = snap.docChanges().map((change) => change.doc.data());
    });
    if (search && search.trim() !== "") {
      collectionToReturn = collectionToReturn.filter((item) => filterItems(item, search));
    }
    
    return collectionToReturn;
  } catch (err) {
    console.error("error getting the data: ", err);
  }
};

function subscribers (collectionKey, collection, setLoading, setCollection) {
  useEffect(() => {
    const dataSubscriber = db(collectionKey).onSnapshot((snap) => {
      handleGetList(snap, collection).then((response) => {
        const returnedCollection = sortCollection(response.collection);
        setCollection(returnedCollection);
      });
      setLoading(false);
    });

    const searchSubscriber = store.subscribe(async () => {
        let returnedCollection = await handleSearch(
          store.getState().search,
          collectionKey,
        );
        returnedCollection = sortCollection(returnedCollection);
        setCollection(returnedCollection);
    });
    
    return () => {
      dataSubscriber();
      searchSubscriber();
    };
  }, []);
}

function ShowClientes({navigation, route}) {
  let [clients, setClients] = useState({
    collection: [],
    alphabet: [],
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const collectionKey = 'clientes';

  subscribers(collectionKey, clients.collection, setLoading, setClients);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <ScrollView
        style={styles.container}
        onScroll={(event) =>
          scrollEvent(
            scrollPosition,
            event.nativeEvent.contentOffset.y,
            addButtonPosition,
            setScrollPosition,
          )
        }>
        {clients.collection.length > 0 ? (
          clients.alphabet.map((letter) => {
            const collection = clients.collection.filter(
              (item) => item.nombre.split('')[0].toUpperCase() === letter,
            );
            return (
              <View key={letter}>
                <Text style={styles.listLetter}>{letter}</Text>
                {collection.map((item) => {
                  const subtitles = [];
                  if (item.email) {
                    subtitles.push(`email: ${item.email}`);
                  }
                  if (item.telefono) {
                    subtitles.push(`cel: ${item.telefono}`);
                  }
                  return (
                    <ListItem
                      key={Math.random()}
                      data={item}
                      title={`${item.nombre}`}
                      subtitle={subtitles}
                      navigation={navigation}
                      route={route}
                    />
                  );
                })}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyListContainer}>
            {EmptyListImages.default()}
            <Text style={styles.emptyListText}>
              Agrega clientes para visualizarlos aquí...
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() => navigation.navigate('Clientes')}>
        <Icon name="add" color="black" size={28} />
      </TouchableOpacity>
    </>
  );
}

function ShowProductos({navigation, route}) {
  const [products, setProducts] = useState({
    collection: [],
    alphabet: [],
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const collectionKey = 'productos';

  subscribers(collectionKey, products.collection, setLoading, setProducts);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <ScrollView
        style={styles.container}
        onScroll={(event) =>
          scrollEvent(
            scrollPosition,
            event.nativeEvent.contentOffset.y,
            addButtonPosition,
            setScrollPosition,
          )
        }>
        {products.alphabet.length > 0 ? (
          products.alphabet.map((letter) => {
            const filteredCollection = products.collection.filter(
              (product) =>
                product.nombre.toUpperCase().split('')[0] ===
                letter.toUpperCase(),
            );
            return filteredCollection.length > 0 ? (
              <View key={letter}>
                <Text style={styles.listLetter}>{letter}</Text>
                {filteredCollection.map((item) => {
                  let subtitles = [`${moneyFormat(item.precioVenta)}`];
                  if (item.marca) {
                    subtitles.push(item.marca);
                  }
                  if (item.descripcion) {
                    subtitles.push(item.descripcion);
                  }
                  return (
                    <ListItem
                      key={Math.random()}
                      data={item}
                      type="productos"
                      title={`${item.nombre}`}
                      subtitle={subtitles}
                      navigation={navigation}
                      route={route}
                    />
                  );
                })}
              </View>
            ) : null;
          })
        ) : (
          <View style={styles.emptyListContainer}>
            {EmptyListImage.default()}
            <Text style={styles.emptyListText}>
              Agrega productos para visualizarlos aquí...
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() => navigation.navigate('Productos')}>
        <Icon name="add" color="black" size={28} />
      </TouchableOpacity>
    </>
  );
}

function ShowServicios({navigation, route}) {
  let [services, setServices] = useState({
    collection: [],
    alphabet: [],
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const collectionKey = 'servicios';

  subscribers(collectionKey, services.collection, setLoading, setServices);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <ScrollView
        style={styles.container}
        onScroll={(event) =>
          scrollEvent(
            scrollPosition,
            event.nativeEvent,
            addButtonPosition,
            setScrollPosition,
          )
        }>
        {services.collection.length > 0 ? (
          services.alphabet.map((letter) => {
            const collection = services.collection.filter(
              (item) => item.nombre.split('')[0].toUpperCase() === letter,
            );
            return (
              <View key={letter}>
                <Text style={styles.listLetter}>{letter}</Text>
                {collection.map((item) => {
                  const subtitles = [];
                  if (item.descripcion) {
                    subtitles.push(item.descripcion);
                  }
                  return (
                    <ListItem
                      key={Math.random()}
                      data={item}
                      title={`${item.nombre} ${moneyFormat(item.precioVenta)}`}
                      subtitle={subtitles}
                      navigation={navigation}
                      route={route}
                    />
                  );
                })}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyListContainer}>
            {EmptyListImage.default()}
            <Text style={styles.emptyListText}>
              Agrega servicios adicionales para visualizarlos aquí...
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() => navigation.navigate('Servicios')}>
        <Icon name="add" color="black" size={28} />
      </TouchableOpacity>
    </>
  );
}

function ShowProveedores({navigation, route}) {
  let [providers, setProviders] = useState({
    collection: [],
    alphabet: [],
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const collectionKey = 'proveedores';

  subscribers(collectionKey, providers.collection, setLoading, setProviders);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <ScrollView
        style={styles.container}
        onScroll={(event) =>
          scrollEvent(
            scrollPosition,
            event.nativeEvent,
            addButtonPosition,
            setScrollPosition,
          )
        }>
        {providers.collection.length > 0 ? (
          providers.alphabet.map((letter) => {
            const filteredCollection = providers.collection.filter(
              (item) => item.nombre.split('')[0].toUpperCase() === letter,
            );
            return (
              <View key={letter}>
                <Text style={styles.listLetter}>{letter}</Text>
                {filteredCollection.map((item) => {
                  const subtitles = [];
                  if (item.email) {
                    subtitles.push(`email: ${item.email}`);
                  }
                  if (item.telefono) {
                    subtitles.push(`cel: ${item.telefono}`);
                  }
                  return (
                    <ListItem
                      key={Math.random()}
                      data={item}
                      title={`${item.nombre}`}
                      subtitle={subtitles}
                      navigation={navigation}
                      route={route}
                    />
                  );
                })}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyListContainer}>
            {EmptyListImage.default()}
            <Text style={styles.emptyListText}>
              Agrega proveedores para visualizarlos aquí...
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() => navigation.navigate('Proveedores')}>
        <Icon name="add" color="black" size={28} />
      </TouchableOpacity>
    </>
  );
}

const ShowWholesalers = ({navigation, route}) => {
  let [wholesalersList, setWholesaler] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const [alphabet, setAlphabet] = useState([]);

  useEffect(
    handleGetCollection(
      'mayoristas',
      wholesalersList,
      setWholesaler,
      setAlphabet,
      setLoading,
    ),
    [],
  );

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <ScrollView
        style={styles.container}
        onScroll={(event) =>
          scrollEvent(
            scrollPosition,
            event.nativeEvent,
            addButtonPosition,
            setScrollPosition,
          )
        }>
        {wholesalersList.length > 0 ? (
          alphabet.map((letter) => {
            const wholesalers = wholesalersList.filter(
              (item) => item.nombre.toUpperCase().split('')[0] === letter,
            );
            return (
              <View key={letter}>
                <Text style={styles.listLetter}>{letter}</Text>
                {wholesalers.map((item) => {
                  let subtitles = [];
                  if (item.email) {
                    subtitles = subtitles.concat(item.email);
                  }
                  if (item.telefono) {
                    subtitles = subtitles.concat(phoneFormat(item.telefono));
                  }
                  return (
                    <ListItem
                      key={Math.random()}
                      data={item}
                      title={`${item.nombre}`}
                      subtitle={subtitles.map((subtitle) => `${subtitle}`)}
                      navigation={navigation}
                      route={route}
                    />
                  );
                })}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyListContainer}>
            {EmptyListImage.default()}
            <Text style={styles.emptyListText}>
              Agrega compradores mayoristas para visualizarlos aquí...
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() => navigation.navigate('Mayoristas')}>
        <Icon name="add" color="black" size={28} />
      </TouchableOpacity>
    </>
  );
};

export {
  ShowClientes,
  ShowProductos,
  ShowServicios,
  ShowProveedores,
  ShowWholesalers,
};
