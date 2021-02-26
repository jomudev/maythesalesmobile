import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Login from './src/components/auth/login';
import SignIn from './src/components/auth/signIn';
import {StatusBar, Alert, TouchableWithoutFeedback} from 'react-native';
import LoadingScreen from './src/components/loadingScreen';
import {initializeAppData} from './src/components/mainFunctions';
import ShowItem from './src/components/showInformacionComponents/ShowItem';
import MainNavigator from './src/components/mainNavigator';
import Configuracion from './src/containers/configuracionContainer';
import {useNavigation} from '@react-navigation/native';
import {ContextMenu, TextBox} from './src/components/auxComponents';
import {deleteFromInventory} from './src/components/mainFunctions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCliente from './src/components/AddComponents/addCliente';
import AddProducto from './src/components/AddComponents/addProducto';
import AddServicio from './src/components/AddComponents/addServicio';
import AddProveedor from './src/components/AddComponents/addProveedor';
import AddWholesaler from './src/components/AddComponents/addWholesaler';
import CamScanner from './src/components/CamScanner';
import SaleReport from './src/components/reportes/saleReport';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import {
  ShowClientes,
  ShowProductos,
  ShowProveedores,
  ShowServicios,
  ShowWholesalers,
} from './src/components/showInformacionComponents/ShowList';
import store from './store';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(undefined);
  const [initializing, setInitializing] = useState(true);
  const [searchIcon, setSearchIcon] = useState('magnify');
  let contextMenuRef = React.createRef();

  const handleDelete = async (type, data, navigation) => {
    try {
      Alert.alert(
        `Eliminar de ${type}`,
        '¿Seguro que quieres eliminar éste registro? Ésta acción es irreversible.',
        [
          {
            text: 'Eliminar',
            onPress: () =>
              deleteFromInventory(type.toLowerCase(), data.id)
                .then((res) => {
                  navigation.goBack();
                })
                .catch((err) => {
                  console.warn(err);
                }),
          },
          {
            text: 'Cancelar',
            onPress: () => {},
          },
        ],
      );
    } catch (err) {
      console.warn(err);
    }
  };

  const ContextMenuIcon = ({tintColor, optionsList}) => {
    return (
      <>
        <TouchableWithoutFeedback>
          <Icon
            style={{padding: 16}}
            name="dots-vertical"
            size={28}
            color={tintColor}
            onPress={() => contextMenuRef.show()}
          />
        </TouchableWithoutFeedback>
        <ContextMenu
          ref={(target) => (contextMenuRef = target)}
          optionsList={optionsList}
          onTouchOutside={() => contextMenuRef.close()}
        />
      </>
    );
  };

  useEffect(() => {
    const authUnsubscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        initializeAppData(authUser).then(
          () => {
            setUser(authUser);
          },
          (err) => {
            console.warn('error trying to initialize app data', err);
          },
        );
      } else {
        setUser(null);
      }
      setInitializing(false);
    });
    return () => {
      authUnsubscribe;
    };
  });

  if (initializing) {
    return <LoadingScreen text="Iniciando" />;
  }

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({route}) => {
            return {
              headerStyle: {
                elevation: 0,
              },
              headerTitleStyle: {
                color: '#000',
              },
              headerRightContainerStyle: {
                textAlign: 'center',
                textAlignVertical: 'center',
              },
              headerRight: (props) => {
                const navigation = useNavigation();
                const routeName = route.name;
                if (
                  routeName !== 'MainNavigator' &&
                  routeName !== 'Configuración' &&
                  routeName !== 'ShowItem' &&
                  routeName !== 'Clientes' &&
                  routeName !== 'Productos' &&
                  routeName !== 'Proveedores' &&
                  routeName !== 'Mayoristas' &&
                  routeName !== 'Servicios' &&
                  routeName !== 'saleReport'
                ) {
                  return (
                    <Icon
                      name={searchIcon}
                      color={props.tintColor}
                      size={28}
                      onPress={() => {
                        if (searchIcon === 'magnify') {
                          setSearchIcon('close');
                          navigation.setOptions({
                            headerTitle: () => (
                              <TextBox
                                placeholder="Buscar..."
                                onChangeText={(text) =>
                                  store.dispatch({type: 'SET_SEARCH', text})
                                }
                              />
                            ),
                          });
                        } else {
                          setSearchIcon('magnify');
                          store.dispatch({
                            type: 'SET_SEARCH',
                            text: '',
                          });
                          navigation.setOptions({
                            headerTitle: route.name.split('Show').join(''),
                          });
                        }
                      }}
                      style={{padding: 16}}
                    />
                  );
                }
              },
            };
          }}>
          <Stack.Screen
            name="MainNavigator"
            options={{
              title: "Maythe's Sales",
              headerTitleStyle: {
                fontSize: 32,
                fontWeight: 'bold',
              },
              headerRight: (props) => {
                const navigation = useNavigation();
                return (
                  <ContextMenuIcon
                    {...props}
                    optionsList={[
                      {
                        text: 'Configuración',
                        iconName: 'cog-outline',
                        onPress: () => navigation.navigate('Configuración'),
                      },
                    ]}
                  />
                );
              },
            }}
            component={MainNavigator}
          />
          <Stack.Screen
            name="ShowItem"
            options={({route}) => ({
              title: route.params.data.nombre,
              headerRight: (props) => {
                const navigation = useNavigation();
                return (
                  <ContextMenuIcon
                    {...props}
                    optionsList={[
                      {
                        text: 'Eliminar',
                        iconName: 'delete-outline',
                        onPress: () => {
                          handleDelete(
                            route.params.type,
                            route.params.data,
                            navigation,
                          );
                        },
                      },
                    ]}
                  />
                );
              },
            })}
            component={ShowItem}
          />
          <Stack.Screen name="Configuración" component={Configuracion} />
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
            name="Clientes"
            options={{title: 'Añadir nuevo cliente'}}
            component={AddCliente}
          />
          <Stack.Screen
            name="ShowClientes"
            options={{title: 'Clientes'}}
            component={ShowClientes}
          />
          <Stack.Screen
            name="Productos"
            options={{title: 'Añadir nuevo producto'}}
            component={AddProducto}
          />
          <Stack.Screen
            name="ShowProductos"
            options={{title: 'Productos'}}
            component={ShowProductos}
          />
          <Stack.Screen
            name="Servicios"
            options={{title: 'Añadir nuevo servicio adicional'}}
            component={AddServicio}
          />
          <Stack.Screen
            name="ShowServicios"
            options={{title: 'Servicios adicionales'}}
            component={ShowServicios}
          />
          <Stack.Screen
            name="Proveedores"
            options={{title: 'Añadir nuevo proveedor'}}
            component={AddProveedor}
          />
          <Stack.Screen
            name="ShowProveedores"
            options={{title: 'Proveedores'}}
            component={ShowProveedores}
          />
          <Stack.Screen
            name="Mayoristas"
            options={{title: 'Añadir nuevo comprador mayorista'}}
            component={AddWholesaler}
          />
          <Stack.Screen
            name="ShowMayoristas"
            options={{title: 'Compradores mayoristas'}}
            component={ShowWholesalers}
          />
          <Stack.Screen name="CamScanner" component={CamScanner} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#0000"
      />
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="signIn" component={SignIn} />
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
