/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import SignInComponent from './src/components/auth/signInComponent';
import {differenceInMinutes} from 'date-fns';
import {
  Alert,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  // Appearance,
  View,
} from 'react-native';
import LoadingScreen from './src/components/loadingScreen';
import ShowItem from './src/components/showInformacionComponents/ShowItem';
import MainNavigator from './src/components/mainNavigator';
import Configuracion from './src/containers/configurationContainer';
import {deleteFromInventory, shareImage, share, moneyFormat, db} from './src/components/mainFunctions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCliente from './src/components/AddComponents/addCliente';
import AddProducto from './src/components/AddComponents/addProducto';
import AddServicio from './src/components/AddComponents/addServicio';
import AddProveedor from './src/components/AddComponents/addProveedor';
import AddWholesaler from './src/components/AddComponents/addWholesaler';
import CamScanner from './src/components/CamScanner';
import SaleReport from './src/components/reports/saleReport';
import ShowInventory from './src/components/showInformacionComponents/ShowInventory';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import PopupMenu from './src/components/PopupMenu';
import Cart from './src/components/Cart';
import MainHeaderRightComponent from './src/components/HeaderComponents/MainHeaderRightComponent';
import store from './store';
import Product from './src/components/Classes/product';
import Service from './src/components/Classes/service';
import Client from './src/components/Classes/client';
import Provider from './src/components/Classes/provider';
import Sale from './src/components/Classes/sale';

//const colorScheme = Appearance.getColorScheme();

Text.defaultProps = {};
Text.defaultProps.maxFontSizeMultiplier = 1.3;
Text.defaultProps.allowFontScaling = true;

TextInput.defaultProps = {};
TextInput.defaultProps.maxFontSizeMultiplier = 1.3;
TextInput.defaultProps.allowFontScaling = true;

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  let popupMenuRef = React.createRef();

  const handleDelete = async (type, data, navigation) => {
    try {
      Alert.alert(
        `Eliminar de ${type}`,
        '¿Seguro que quieres eliminar éste registro? Ésta acción es irreversible.',
        [
          {
            text: 'No, Cancelar',
            onPress: () => {},
          },
          {
            text: 'Sí, estoy seguro',
            onPress: () =>
              deleteFromInventory(type.toLowerCase(), data)
                .then(() => {
                  navigation.goBack();
                })
                .catch((err) => {
                  console.warn(err);
                }),
          },
        ],
      );
    } catch (err) {
      console.warn(err);
    }
  };

  const contextMenuFunction = (index, optionsList) => {
    if (index !== undefined) {
      optionsList[index].onPress();
    }
  };

  const ContextMenu = ({tintColor, optionsList, title}) => {
    return (
      <View>
        <TouchableWithoutFeedback>
          <Icon
            style={{padding: 16}}
            name="dots-vertical"
            size={28}
            color={tintColor}
            onPress={() => popupMenuRef.show()}
          />
        </TouchableWithoutFeedback>
        <PopupMenu
          ref={(ref) => (popupMenuRef = ref)}
          title={title || 'Opciones'}
          function={(index) => contextMenuFunction(index, optionsList)}
          options={optionsList.map((item) => item.text)}
          onTouchOutside={() => popupMenuRef.close()}
        />
      </View>
    );
  };

  const getOptionsList = ({params}, navigation) => {
    const {data, type} = params;
    const shareMessage = `${data.nombre} ${data.marca} - ${moneyFormat(data.precioVenta)} ${data.descripcion ? '| ' + data.descripcion : ''}`;
    const shareOptions = {       
      title: shareMessage,
      message: shareMessage
    };

    var optionsList = [{
        text: 'Eliminar',
        onPress: () => {
          handleDelete(
            params.type,
            params.data,
            navigation
          );
        },
      }]

    if (type === 'productos') {
      optionsList = [
        ...optionsList,
        {
          text: 'Compartir',
          onPress: () => {
            shareImage(data.imageURL, shareOptions);
          }
        },
        {
          text: 'Compartir solo detalles',
          onPress: () => {
            share(shareOptions)
          }
        }
      ]
    }

    return optionsList;
  }

  useEffect(() => {
    const authUnsubscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        db().onSnapshot((snapshot) => {
          const user = snapshot.data();
          setUser({
            ...auth().currentUser,
            ...user,
          });
          store.dispatch({
            type: 'SET_USER',
            data: user,
          });

          db('productos').get().then((doc) => { 
            const products = doc.docs.map(item => new Product(item.data()));
            db('servicios').get().then((doc) => {
              const services = doc.docs.map(item => new Service(item.data()));
              db('clientes').get().then((doc) => {
                const clients = doc.docs.map(item => new Client(item.data()));
                db('proveedores').get().then((doc) => {
                  const providers = doc.docs.map(item => new Provider(item.data()));
                  store.dispatch({
                      type: 'SET_INVENTORY',
                      data: {
                        products,
                        services,
                        clients,
                        providers,
                      },
                    });
                  setLoading(false);
                }).catch((err) => {
                  setLoading(false);
                  console.warn(err);
                });
              }).catch((err) => {
                setLoading(false);
                console.warn(err);
              });
            }).catch((err) => {
              setLoading(false);
              console.warn(err);
            });
          }).catch((err) => {
            setLoading(false);
            console.warn(err);
          });


        })
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      authUnsubscribe;
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({route, navigation}) => {
            return {
              headerStyle: { 
                elevation: 0,
              },
              headerRight: (props) => (
                <MainHeaderRightComponent
                  {...props}
                  route={route}
                  navigation={navigation}
                />
              ),
            };
          }}>
            <Stack.Screen
              name="MainNavigator"
              options={() => ({
                headerLeft: null,
                title: "Maythe's Sales",
                headerTitleStyle: {
                  fontSize: 28,
                  fontFamily:  'VarelaRound-Regular',
                  fontWeight: 'bold',
                },
              })}
              component={MainNavigator}
            />
            <Stack.Screen
              name="ShowInventory"
              options={({route}) => ({
                title: route.params.collectionKey[0].toUpperCase() + route.params.collectionKey.substring(1),
              })}
              component={ShowInventory}
            />
            <Stack.Screen
            name="ShowItem"
            options={({route, navigation}) => ({
              title: route.params.data.nombre,
              headerRight: (props) => {
                return (
                  <ContextMenu
                    {...props}
                    optionsList={getOptionsList(route, navigation)}
                  />
                );
              },
            })}
            component={ShowItem}
          />
          <Stack.Screen
            name="Configuration"
            options={{title: 'Configuración'}}
            component={Configuracion}
          />
          <Stack.Screen
            name="Cart"
            options={{
              title: 'Carrito',
            }}
            component={Cart}
          />
            <Stack.Screen
            name="saleReport"
            options={({route}) => ({
              title: `Venta del ${format(
                new Date(route.params.data.timestamp.seconds * 1000),
                'PPPP',
                {
                  locale: es,
                },
              )}`,
            })}
            component={SaleReport}
            />
            
          <Stack.Screen
            options={{headerMode: 'none'}}
            name="CamScanner" component={CamScanner} />
          <Stack.Screen
            name="Clientes"
            options={{title: 'Añadir nuevo cliente'}}
            component={AddCliente}
          />
          <Stack.Screen
            name="Productos"
            options={{title: 'Añadir nuevo producto'}}
            component={AddProducto}
          />
          <Stack.Screen
            name="Servicios"
            options={{title: 'Añadir nuevo servicio adicional'}}
            component={AddServicio}
          />
          <Stack.Screen
            name="Proveedores"
            options={{title: 'Añadir nuevo proveedor'}}
            component={AddProveedor}
          />
          <Stack.Screen
            name="Mayoristas"
            options={{title: 'Añadir nuevo comprador mayorista'}}
            component={AddWholesaler}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#0000"
      />
      <SignInComponent/>
    </>
  );
};

export default App;
