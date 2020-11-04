/* eslint-disable react-native/no-inline-styles */

/**
 * @var {user} Object = Datos de sesion del usuario.
 * @var {userData} Object = Datos e información del usuario.
 */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Title, Caption, Avatar, Drawer} from 'react-native-paper';
import store from '../../../store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './draweStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

async function signOut() {
  try {
    return await auth().signOut();
  } catch (e) {
    console.log(e, 'signout error');
  }
}

async function getUser() {
  try {
    let user = null;
    let userData = null;

    user = auth().currentUser;
    return await firestore()
      .collection('negocios')
      .doc(user.uid)
      .get()
      .then((doc) => {
        userData = doc.data();
        return {userData, user};
      });
  } catch (err) {
    console.log('error al obtener los datos del usuario', err);
  }
}

const DrawerContent = (props) => {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscriber = getUser().then((data) => {
      //console.log(data);
      setUser(data.user);
      setUserData(data.userData);
    });
    return () => {
      unsubscriber;
    };
  }, []);

  return (
    <View style={{flex: 1, height: '100%'}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {user && userData ? (
            <View style={styles.userSection}>
              <Avatar.Icon icon="account" style={styles.avatar} />
              <View style={styles.userInfo}>
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  <Title style={{fontWeight: 'bold'}}>{user.displayName}</Title>
                  <Caption style={{fontWeight: 'bold'}}>
                    {userData ? userData.negocio : ''}
                  </Caption>
                  <Caption style={{fontWeight: 'bold'}}>
                    {userData ? userData.email : ''}
                  </Caption>
                </View>
              </View>
            </View>
          ) : null}
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
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="settings" color={color} size={size} />
              )}
              label="Configuracion"
              onPress={() => props.navigation.navigate('Configuracion')}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Cerrar sesion"
          onPress={() =>
            signOut()
              .then(() => store.dispatch({type: 'SIGNOUT'}))
              .catch((err) => console.log('error', err))
          }
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
