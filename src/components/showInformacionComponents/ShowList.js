/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, ScrollView, View, Animated} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItem from './listItem';
import EmptyListImage from '../emptyListImage';
import {moneyFormat, phoneFormat, handleGetList, db} from '../mainFunctions';
import store from '../../../store';
import EmptyListImages from '../emptyListImage';
import LoadingScreen from '../loadingScreen';

const scrollEvent = (
  scrollPosition,
  value,
  addButtonPosition,
  setScrollPosition,
) => {
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

const sortAndSetList = async (list, search) => {
  try {
    let newList = list;
    if (search && search.trim() !== '') {
      newList = newList.filter((item) =>
        item.nombre.toUpperCase().includes(search.toUpperCase()),
      );
    }
    newList = list.sort((p, n) => {
      // p = prevLetter, n = nextLetter
      p = p.nombre.split('')[0];
      n = n.nombre.split('')[0];
      if (p > n) {
        return 1;
      } else if (p < n) {
        return -1;
      } else {
        return 0;
      }
    });

    return {
      alphabet: [...new Set(newList.map((item) => item.nombre.split('')[0]))],
      collection: newList,
    };
  } catch (err) {
    console.log('Error al ordenar la colección de datos', err);
  }
};

function ShowClientes({navigation, route}) {
  let [clientsList, setClients] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const [alphabet, setAlphabet] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = db()
        .collection('clientes')
        .onSnapshot((snap) =>
          handleGetList(snap, clientsList).then((res) => {
            if (!res.isItIdentical) {
              sortAndSetList(res.newList, store.getState().search).then(
                (sorted) => {
                  setClients(sorted.collection);
                  setAlphabet(sorted.alphabet);
                },
              );
            }
            if (loading) {
              setLoading(false);
            }
          }),
        );

      const searchSubscriber = store.subscribe(() => {
        sortAndSetList(clientsList, store.getState().search).then((sorted) => {
          setClients(sorted.collection);
          setAlphabet(sorted.alphabet);
        });
      });

      return () => {
        unsubscribe();
        searchSubscriber();
      };
    } catch (err) {
      console.warn('error al intentar obtener los clientes ', err);
    }
  }, []);
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
        {clientsList.length > 0 ? (
          alphabet.map((letter) => {
            const clients = clientsList.filter(
              (item) => item.nombre.split('')[0].toUpperCase() === letter,
            );
            return (
              <View key={letter}>
                <Text style={styles.listLetter}>{letter}</Text>
                {clients.map((item) => {
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
  const [allProducts, setAllProducts] = useState([]);
  const [productsList, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const [alphabet, setAlphabet] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = db()
        .collection('productos')
        .onSnapshot((snap) =>
          handleGetList(snap, productsList).then((res) => {
            if (!res.isItIdentical) {
              sortAndSetList(res.newList, store.getState().search).then(
                (sorted) => {
                  setAllProducts(res.newList);
                  setProducts(sorted.collection);
                  setAlphabet(sorted.alphabet);
                },
              );
            }
            if (loading) {
              setLoading(false);
            }
          }),
        );

      const searchSubscriber = store.subscribe(() => {
        sortAndSetList(allProducts, store.getState().search).then((sorted) => {
          setProducts(sorted.collection);
          setAlphabet(sorted.alphabet);
        });
      });
      return () => {
        unsubscribe();
        searchSubscriber();
      };
    } catch (err) {
      console.warn('error al intentar obtener los datos de productos ', err);
    }
  }, []);

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
        {alphabet.length > 0 ? (
          alphabet.map((letter) => {
            const products = productsList.filter(
              (product) =>
                product.nombre.toUpperCase().split('')[0] ===
                letter.toUpperCase(),
            );
            return products.length > 0 ? (
              <View key={letter}>
                <Text style={styles.listLetter}>{letter}</Text>
                {products.map((item) => {
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
  let [servicesList, setServices] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [alphabet, setAlphabet] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = db()
        .collection('servicios')
        .onSnapshot((snap) =>
          handleGetList(snap, servicesList, setServices).then((res) => {
            if (!res.isItIdentical) {
              sortAndSetList(
                res.newList,
                setServices,
                store.getState().search,
                setAlphabet,
              );
            }
            if (loading) {
              setLoading(false);
            }
          }),
        );

      const searchSubscriber = store.subscribe(() => {
        sortAndSetList(
          servicesList,
          setServices,
          store.getState().search,
          setAlphabet,
        );
      });
      return () => {
        unsubscribe();
        searchSubscriber();
      };
    } catch (err) {
      console.warn(
        'error al intentar obtener los datos de los servicios ',
        err,
      );
    }
  }, []);

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
        {servicesList.length > 0 ? (
          alphabet.map((letter) => {
            const services = servicesList.filter(
              (item) => item.nombre.split('')[0].toUpperCase() === letter,
            );
            return (
              <View key={letter}>
                <Text style={styles.listLetter}>{letter}</Text>
                {services.map((item) => {
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
  let [providersList, setProviders] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const [alphabet, setAlphabet] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = db()
        .collection('proveedores')
        .onSnapshot((snap) =>
          handleGetList(snap, providersList, setProviders).then((res) => {
            if (!res.isItIdentical) {
              sortAndSetList(
                res.newList,
                setProviders,
                store.getState().search,
                setAlphabet,
              );
            }
            if (loading) {
              setLoading(false);
            }
          }),
        );
      const searchSubscriber = store.subscribe(() => {
        sortAndSetList(
          providersList,
          setProviders,
          store.getState().search,
          setAlphabet,
        );
      });
      return () => {
        unsubscribe();
        searchSubscriber();
      };
    } catch (err) {
      console.warn('error al intentar obtener los datos de proveedores ', err);
    }
  }, []);

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
        {providersList.length > 0 ? (
          alphabet.map((letter) => {
            const providers = providersList.filter(
              (item) => item.nombre.split('')[0].toUpperCase() === letter,
            );
            return (
              <View key={letter}>
                <Text style={styles.listLetter}>{letter}</Text>
                {providers.map((item) => {
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

  useEffect(() => {
    try {
      const unsubscribe = db()
        .collection('mayoristas')
        .onSnapshot((snap) =>
          handleGetList(snap, wholesalersList, setWholesaler).then((res) => {
            if (!res.isItIdentical) {
              sortAndSetList(
                res.newList,
                setWholesaler,
                store.getState().search,
                setAlphabet,
              );
            }
            if (loading) {
              setLoading(false);
            }
          }),
        );
      const searchSubscriber = store.subscribe(() => {
        sortAndSetList(
          wholesalersList,
          setWholesaler,
          store.getState().search,
          setAlphabet,
        );
      });
      return () => {
        unsubscribe();
        searchSubscriber();
      };
    } catch (err) {
      console.warn('error al intentar los registros de mayoristas', err);
    }
  }, []);

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
