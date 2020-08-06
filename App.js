/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeContainer from './src/containers/HomeContainer';
import CotizacionContainer from './src/containers/CotizacionContainer';
import ReportesContainer from './src/containers/ReportesContainer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import store from './store';

const Stack = createStackNavigator();

const Home = ({navigation}) => {
  return <HomeContainer navigation={navigation} />;
};

const Cotizacion = ({navigation}) => {
  return <CotizacionContainer navigation={navigation} />;
};

const Reportes = ({navigation}) => {
  return <ReportesContainer navigation={navigation} />;
};

const DrawerContent: () => React$Node = props => {
  const [user, setUser] = useState(store.getState().user);
  const [userData, setUserData] = useState(store.getState().userData);
  useEffect(() => {
    const subscriber = store.subscribe(() => {
      if (store.getState().user) {
        setUser(store.getState().user);
        setUserData(store.getState().userData);
      }
    });
    return subscriber();
  }, []);

  return (
    <View style={{flex: 1, height: '100%'}}>
      <StatusBar barStyle="light-content" backgroundColor="#101e5a" />
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userSection}>
            <Image
              style={styles.drawerUserBg}
              source={require('./src/assets/AditionalMedia/maythesalesBG.png')}
            />
            <View style={styles.userInfo}>
              <Avatar.Image
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/maythes-sales-test.appspot.com/o/Media%2F822711_user_512x512.png?alt=media&token=af5a4b05-2ecc-4f41-8ee4-084f4cebe6bf',
                }}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={{fontWeight: 'bold'}}>{user.displayName}</Title>
                <Caption style={{fontWeight: 'bold'}}>
                  {userData.negocio}
                </Caption>
              </View>
            </View>
          </View>
        </View>
        <Drawer.Section>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home" color={color} size={size} />
            )}
            label="Inicio"
            onPress={() => {
              props.navigation.navigate('Inicio');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="content-paste" color={color} size={size} />
            )}
            label="Reportes"
            onPress={() => {
              props.navigation.navigate('Reportes');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Cerrar sesion"
          onPress={() => auth().signOut()}
        />
      </Drawer.Section>
    </View>
  );
};

// Login o SignUp al presionar el boton de logeo
async function onSigninButtonPress({email, password}, type) {
  if (type === 'login') {
    return auth().signInWithEmailAndPassword(email, password);
  }
  if (email !== '' && password !== '') {
    return auth().createUserWithEmailAndPassword(email, password);
  } else {
    Alert.alert('los campos no pueden estar vacios');
    return null;
  }
}

let newUserData = {};

const App: () => React$Node = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    //iniciamos un escucha para la autenticacion.
    const authSubscriber = auth().onAuthStateChanged(authUser => {
      setInitializing(false);
      if (authUser !== null) {
        firestore()
          .collection('users')
          .doc(authUser.uid)
          .onSnapshot(snap => {
            store.dispatch({
              type: 'SET_USER_DATA',
              data: snap.data(),
              use: authUser,
            });
          });
        // Iniciamos escuchas para los datos de la base de datos
        //Ventas
        firestore()
          .collection('users')
          .doc(authUser.uid)
          .collection('ventas')
          .onSnapshot(snap => {
            let ventasList = store.getState().ventas;
            if (!snap.empty) {
              snap.docChanges().forEach(change => {
                const data = change.doc.data();
                if (change.type === 'added') {
                  ventasList = ventasList.concat(data);
                }
                if (change.type === 'modified') {
                  for (let i = 0; i < ventasList.length; i++) {
                    if (ventasList[i].id === data.id) {
                      ventasList.splice(i, 1, data);
                    }
                  }
                }
                if (change.type === 'modified') {
                  for (let i = 0; i < ventasList.length; i++) {
                    if (ventasList[i].id === data.id) {
                      ventasList.splice(i, 1);
                    }
                  }
                }
              });
            }
            store.dispatch({
              type: 'SET_VENTAS',
              ventas: ventasList,
            });
          });
        // Productos
        firestore()
          .collection('users')
          .doc(authUser.uid)
          .collection('productos')
          .onSnapshot(snap => {
            let productsList = store.getState().products;
            if (!snap.empty) {
              snap.docChanges().forEach(change => {
                const data = change.doc.data();
                if (change.type === 'added') {
                  productsList = productsList.concat(data);
                }
                if (change.type === 'modified') {
                  for (let i = 0; i < productsList.length; i++) {
                    if (productsList[i].id === data.id) {
                      productsList.splice(i, 1, data);
                    }
                  }
                }
                if (change.type === 'removed') {
                  for (let i = 0; i < productsList.length; i++) {
                    if (productsList[i].id === data.id) {
                      productsList.splice(i, 1);
                    }
                  }
                }
              });
              store.dispatch({
                type: 'SET_PRODUCTS',
                products: productsList,
              });
            }
          });

        // Clientes
        firestore()
          .collection('users')
          .doc(authUser.uid)
          .collection('clientes')
          .onSnapshot(snap => {
            let clientsList = store.getState().clients;
            if (!snap.empty) {
              snap.docChanges().forEach(change => {
                const data = change.doc.data();
                if (change.type === 'added') {
                  clientsList = clientsList.concat(data);
                }
                if (change.type === 'modified') {
                  for (let i = 0; i < clientsList.length; i++) {
                    if (clientsList[i].id === data.id) {
                      clientsList.splice(i, 1, data);
                    }
                  }
                }
                if (change.type === 'removed') {
                  for (let i = 0; i < clientsList.length; i++) {
                    if (clientsList[i].id === data.id) {
                      clientsList.splice(i, 1);
                    }
                  }
                }
              });
              store.dispatch({
                type: 'SET_CLIENTS',
                clients: clientsList,
              });
            }
          });
        // Proveedores
        firestore()
          .collection('users')
          .doc(authUser.uid)
          .collection('proveedores')
          .onSnapshot(snap => {
            let providersList = store.getState().providers;
            if (!snap.empty) {
              snap.docChanges().forEach(change => {
                const data = change.doc.data();
                if (change.type === 'added') {
                  providersList = providersList.concat(data);
                }
                if (change.type === 'modified') {
                  for (let i = 0; i < providersList.length; i++) {
                    if (providersList[i].id === data.id) {
                      providersList.splice(i, 1, data);
                    }
                  }
                }
                if (change.type === 'removed') {
                  for (let i = 0; i < providersList.length; i++) {
                    if (providersList[i].id === data.id) {
                      providersList.splice(i, 1);
                    }
                  }
                }
              });
              store.dispatch({
                type: 'SET_PROVIDERS',
                providers: providersList,
              });
            }
          });

        // Servicios adicionales
        firestore()
          .collection('users')
          .doc(authUser.uid)
          .collection('servicios_adicionales')
          .onSnapshot(snap => {
            let servicesList = store.getState().services;
            if (!snap.empty) {
              snap.docChanges().forEach(change => {
                const data = change.doc.data();
                if (change.type === 'added') {
                  servicesList = servicesList.concat(data);
                }
                if (change.type === 'modified') {
                  for (let i = 0; i < servicesList.length; i++) {
                    if (servicesList[i].id === data.id) {
                      servicesList.splice(i, 1, data);
                    }
                  }
                }
                if (change.type === 'removed') {
                  for (let i = 0; i < servicesList.length; i++) {
                    if (servicesList[i].id === data.id) {
                      servicesList.splice(i, 1);
                    }
                  }
                }
              });
              store.dispatch({
                type: 'SET_SERVICES',
                services: servicesList,
              });
            }
          });
      } else {
        store.dispatch({
          type: 'SET_USER_DATA',
          data: null,
        });
        store.dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });

    // escucha para saber si el usuario es nuevo 
    const isNewUser_Subscriber = store.subscribe(() => {
      if (store.getState().isNewUser !== isNewUser) {
        setIsNewUser(store.getState().isNewUser);
      }
    });

    // escucha para saber si el usuario esta logeado
    const isAuthenticated_Subscriber = store.subscribe(() => {
      if (
        store.getState().user !== user &&
        store.getState().userData !== null
      ) {
        setUser(store.getState().user);
      }
    });

    // Metodo para cancelar todos los escuchas
    const clean = () => {
      isNewUser_Subscriber;
      authSubscriber;
      isAuthenticated_Subscriber;
    };

    return clean;
  }, []);

  if (initializing) {
    return null;
  }

  if (user) {
    if (isNewUser) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          nombres: newUserData.nombres,
          apellidos: newUserData.apellidos,
          email: newUserData.email,
          negocio: newUserData.negocio,
        })
        .then(() => {
          store.dispatch({
            type: 'SET_IS_NEW_USER',
            data: false,
          });
        });
    }

    const DrawerNavigator = () => (
      <DrawerApp.Navigator
        drawerContent={({navigation}) => (
          <DrawerContent user={user} navigation={navigation} />
        )}
        drawerType="back">
        <DrawerApp.Screen name="Inicio" component={Home} />
        <DrawerApp.Screen name="Reportes" component={Reportes} />
      </DrawerApp.Navigator>
    );

    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="drawerNavigator" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="signin" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Image
        source={require('./src/assets/AditionalMedia/logo.png')}
        style={styles.loginBG}
      />
      <ScrollView style={{width: '100%'}}>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          placeholder="Correo electrónico"
        />
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          textContentType="password"
          placeholder="Contraseña"
        />
        <Button
          onPress={() =>
            onSigninButtonPress({email, password}, 'login')
              .then(() => {
                setEmail('');
                setPassword('');
                return null;
              })
              .catch(err => {
                if (err.code === 'auth/user-not-found') {
                  Alert.alert(
                    'Error de autenticación',
                    'el usuario no fue encontrado, intente de nuevo',
                  );
                }
              })
          }
          text="Iniciar Sesion"
        />
        <Button
          onPress={() => {
            navigation.navigate('signin');
          }}
          text="Registrarse"
        />
      </ScrollView>
    </View>
  );
};

const Signin: () => React$Node = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [negocio, setNegocio] = useState('');
  const [passwordConfirmed, confirmPassword] = useState(null);

  const confirmIfPasswordAreTheSame = text => {
    if (text === password) {
      confirmPassword(null);
    } else {
      confirmPassword('las contraseñas no coinciden');
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
      }}>
      <Image
        source={require('./src/assets/AditionalMedia/logo.png')}
        style={styles.loginBG}
      />
      <ScrollView
        style={{
          width: '100%',
        }}>
        <TextInput
          placeholder="Nombres"
          style={styles.textInput}
          value={`${nombres}`}
          onChangeText={text => setNombres(text)}
        />
        <TextInput
          placeholder="Apellidos"
          style={styles.textInput}
          value={`${apellidos}`}
          onChangeText={text => setApellidos(text)}
        />
        <TextInput
          placeholder="Correo electrónico"
          style={styles.textInput}
          value={`${email}`}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Nombre del negocio"
          style={styles.textInput}
          value={`${negocio}`}
          onChangeText={text => setNegocio(text)}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.textInput}
          secureTextEntry={true}
          value={`${password}`}
          onChangeText={text => {
            setPassword(text);
            confirmIfPasswordAreTheSame(text);
          }}
        />
        <TextInput
          placeholder="Repite la contraseña"
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={text => confirmIfPasswordAreTheSame(text)}
        />
        {passwordConfirmed ? (
          <Text style={{color: 'red', textAlign: 'center'}}>
            {passwordConfirmed}
          </Text>
        ) : null}
        <Button
          onPress={() => {
            if (nombres !== '' && apellidos !== '' && negocio !== '') {
              if (passwordConfirmed) {
                Alert.alert('Las contraseñas no coinciden verifica nuevamente');
                return;
              }
              onSigninButtonPress({email, password}, 'signin')
                .then(result => {
                  let nombre = nombres.split(' ');
                  let apellido = apellidos.split(' ');
                  let displayName = `${nombre[0]} ${apellido[0]}`;
                  result.user.updateProfile({
                    displayName,
                  });
                  newUserData = {
                    nombres,
                    apellidos,
                    email,
                    negocio,
                  };
                  store.dispatch({
                    type: 'SET_IS_NEW_USER',
                    data: true,
                  });
                })
                .catch(err => {
                  console.warn(err.code);
                  if (err.code === 'auth/email-alredy-in-use') {
                    Alert.alert(
                      'El correo electrónico ya esta siendo utilizado.',
                    );
                  }
                });
            } else {
              Alert.alert('Llena todos los campos');
            }
          }}
          text="Registrarse"
        />
      </ScrollView>
    </View>
  );
};

const Button = ({onPress, text}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress()}>
      <Text style={{color: '#f7f8f9', textAlign: 'center'}}>{text}</Text>
    </TouchableOpacity>
  );
};

const DrawerApp = createDrawerNavigator();

export default App;

const styles = StyleSheet.create({
  signButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#efefef',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#5d80b6',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 4,
    alignSelf: 'center',
    margin: 5,
  },
  Separator: {
    padding: 0,
    width: 300,
    marginVertical: 5,
  },
  loginBG: {
    resizeMode: 'center',
    height: '30%',
  },
  drawerUserBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'absolute',
    borderWidth: 1,
    height: '100%',
    width: '100%',
  },
  textInput: {
    backgroundColor: 'rgb(250,250,250)',
    borderRadius: 4,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 4,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
    paddingHorizontal: 10,
    margin: 6,
    alignSelf: 'center',
  },
  userSection: {
    height: 150,
    flexDirection: 'row',
    marginTop: -10,
  },
  userInfo: {
    marginLeft: 5,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

// PENDIENTES AGREGAR
// <Drawer.Screen name="Cotizaciones" component={Cotizacion} />
