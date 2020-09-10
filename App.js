/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import store from './store';
import Login from './src/components/auth/login';
import Signin from './src/components/auth/signIn';
import DrawerNavigator from './src/components/drawer';

const Stack = createStackNavigator();

const App = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [newUserData, setNewUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    store.subscribe(() => {
      const state = store.getState();
      if (state.newUserData) {
        setNewUserData(state.newUserData);
      }
    });

    auth().onAuthStateChanged(authUser => {
      let listaProductos = [];
      let listaVentas = [];
      let listaClientes = [];
      let listaServices = [];
      if (authUser) {
        firestore()
          .doc(`users/${authUser.uid}`)
          .get()
          .then(doc => {
            const userData = doc.data();
            store.dispatch({
              type: 'SET_USER',
              user: authUser,
              userData,
            });
            firestore()
              .doc(`users/${authUser.uid}`)
              .collection('productos')
              .onSnapshot(snap => {
                snap.docChanges().forEach(change => {
                  const data = change.doc.data();
                  change.type === 'added'
                    ? (listaProductos = listaProductos.concat(data))
                    : null;
                  change.type === 'modified'
                    ? listaProductos.forEach((p, i) =>
                        p.id === data.id
                          ? listaProductos.splice(i, 1, data)
                          : null,
                      )
                    : null;
                  change.type === 'removed'
                    ? listaProductos.forEach((p, i) =>
                        p.id === data.id ? listaProductos.splice(i, 1) : null,
                      )
                    : null;
                });
                store.dispatch({
                  type: 'SET_PRODUCTS',
                  products: listaProductos,
                });
              });

            firestore()
              .doc(`users/${authUser.uid}`)
              .collection('ventas')
              .orderBy('fecha')
              .onSnapshot(snap => {
                snap.docChanges().forEach(change => {
                  const data = change.doc.data();
                  change.type === 'added'
                    ? (listaVentas = listaVentas.concat(data))
                    : null;
                  change.type === 'modified'
                    ? listaVentas.forEach((v, i) =>
                        v.id === data.id
                          ? listaVentas.splice(i, 1, data)
                          : null,
                      )
                    : null;
                  change.type === 'modified'
                    ? listaVentas.forEach((v, i) =>
                        v.id === data.id ? listaVentas.splice(i, 1) : null,
                      )
                    : null;
                });
                store.dispatch({
                  type: 'SET_VENTAS',
                  ventas: listaVentas,
                });
              });

            firestore()
              .doc(`users/${authUser.uid}`)
              .collection('clientes')
              .onSnapshot(snap => {
                snap.docChanges().forEach(change => {
                  const data = change.doc.data();
                  change.type === 'added'
                    ? (listaClientes = listaClientes.concat(data))
                    : null;
                  change.type === 'modified'
                    ? listaClientes.forEach((c, i) =>
                        c.id === data.id
                          ? listaClientes.splice(i, 1, data)
                          : null,
                      )
                    : null;
                  change.type === 'modified'
                    ? listaClientes.forEach((c, i) =>
                        c.id === data.id ? listaClientes.splice(i, 1) : null,
                      )
                    : null;
                });
                store.dispatch({
                  type: 'SET_CLIENTS',
                  clients: listaClientes,
                });
              });

            firestore()
              .doc(`users/${authUser.uid}`)
              .collection('servicios')
              .onSnapshot(snap => {
                snap.docChanges().forEach(change => {
                  const data = change.doc.data();
                  change.type === 'added'
                    ? (listaServices = listaServices.concat(data))
                    : null;
                  change.type === 'modified'
                    ? listaServices.forEach((s, i) =>
                        s.id === data.id
                          ? listaServices.splice(i, 1, data)
                          : null,
                      )
                    : null;
                  change.type === 'modified'
                    ? listaServices.forEach((s, i) =>
                        s.id === data.id ? listaServices.splice(i, 1) : null,
                      )
                    : null;
                });
                store.dispatch({
                  type: 'SET_SERVICES',
                  clients: listaServices,
                });
              });

            let listaProveedores = [];
            firestore()
              .doc(`users/${authUser.uid}`)
              .collection('proveedores')
              .onSnapshot(snap => {
                snap.docChanges().forEach(change => {
                  const data = change.doc.data();
                  change.type === 'added'
                    ? (listaProveedores = listaProveedores.concat(data))
                    : null;
                  change.type === 'modified'
                    ? listaProveedores.forEach((p, i) =>
                        p.id === data.id
                          ? listaProveedores.splice(i, 1, data)
                          : null,
                      )
                    : null;
                  change.type === 'modified'
                    ? listaProveedores.forEach((p, i) =>
                        p.id === data.id ? listaProveedores.splice(i, 1) : null,
                      )
                    : null;
                });
                store.dispatch({
                  type: 'SET_PROVIDERS',
                  providers: listaProveedores,
                });
              });

            authUser ? setInitializing(false) : null;
          });
      }
    });
    store.subscribe(() => {
      const state = store.getState();
      state.isNewUser ? setIsNewUser(state.isNewUser) : null;
      state.user ? setUser(state.user) : null;
    });
  });

  initializing ? (
    <>
      <ActivityIndicator />
    </>
  ) : null;

  if (user) {
    isNewUser
      ? firestore()
          .doc(`users/${user.uid}`)
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
          })
      : null;
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

export default App;
// PENDIENTES AGREGAR
// <Drawer.Screen name="Cotizaciones" component={Cotizacion} />
